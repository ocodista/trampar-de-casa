import { Elysia, t } from 'elysia'
import { createClient } from '@supabase/supabase-js'
import { createClient as createRedisClient } from 'redis'

// Simple Queue implementation
class Queue<T> {
  private items: T[] = []
  enqueue(item: T) {
    this.items.push(item)
  }
  dequeue(): T | undefined {
    return this.items.shift()
  }
  isEmpty(): boolean {
    return this.items.length === 0
  }
  size(): number {
    return this.items.length
  }
}

// Constants
const ENV_VARS = {
  MAX_WAIT_MS: 'MAX_WAIT_MS',
  SUPABASE_URL: 'SUPABASE_URL',
  SUPABASE_ANON_KEY: 'SUPABASE_ANON_KEY',
  REDIS_URL: 'REDIS_URL',
  VERBOSE: 'VERBOSE',
}

const TABLE_NAMES = {
  VIEWS: 'Views',
  ROLES: 'Roles',
}

const REDIS_KEYS = {
  READY_ROLES: 'ready_roles',
}

const HTTP_STATUS = {
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
  REDIRECT: 302,
}

const SERVER_CONFIG = {
  PORT: 5500,
}

const BATCH_SIZE = 500
const MAX_WAIT_TIME = process.env[ENV_VARS.MAX_WAIT_MS] || 5 * 60 * 1000 // 5 minutes
const IMMEDIATE_PROCESS_THRESHOLD = 100 // Process immediately if queue size reaches this

// Read environment variables
const supabaseUrl = process.env[ENV_VARS.SUPABASE_URL]
const supabaseAnonKey = process.env[ENV_VARS.SUPABASE_ANON_KEY]
const redisUrl = process.env[ENV_VARS.REDIS_URL]
const isVerbose =
  process.env[ENV_VARS.VERBOSE] === 'true' ||
  process.env[ENV_VARS.VERBOSE] === '1'

if (!supabaseUrl || !supabaseAnonKey || !redisUrl) {
  console.error(
    `${ENV_VARS.SUPABASE_URL}, ${ENV_VARS.SUPABASE_ANON_KEY}, and ${ENV_VARS.REDIS_URL} environment variables must be set`
  )
  process.exit(1)
}

// Verbose logging function
function verboseLog(...args: any[]) {
  if (isVerbose) {
    console.log('[VERBOSE]', new Date().toISOString(), ...args)
  }
}

// Initialize Supabase client
const supabase = createClient(supabaseUrl, supabaseAnonKey)
verboseLog('Supabase client initialized')

// Initialize Redis client
const redisClient = createRedisClient({ url: redisUrl })
await redisClient.connect()
verboseLog('Redis client connected')

// Function to fetch ready roles from Supabase and cache in Redis
async function cacheReadyRoles() {
  verboseLog('Fetching ready roles from Supabase')
  const { data, error } = await supabase
    .from(TABLE_NAMES.ROLES)
    .select('id, url')
    .eq('ready', true)
  if (error) throw error

  if (data && data.length > 0) {
    const pipeline = redisClient.multi()
    const roleMap = data.reduce((acc, role) => {
      acc[role.id] = role.url
      return acc
    }, {})
    await pipeline.del(REDIS_KEYS.READY_ROLES) // Clear existing cache
    await pipeline.hSet(REDIS_KEYS.READY_ROLES, roleMap)
    await pipeline.exec()
    verboseLog(`Cached ${data.length} ready roles in Redis`)
  }
  return data?.length || 0
}

// Check if Redis has "ready_roles" collection, if not, populate it
const readyRolesExist = await redisClient.exists(REDIS_KEYS.READY_ROLES)
if (!readyRolesExist) {
  verboseLog('Ready roles not found in Redis, populating cache')
  await cacheReadyRoles()
}

// Function to record views in bulk
async function recordViews(roleIds: string[]) {
  verboseLog(`Recording views for ${roleIds.length} roles`)
  const insertData = roleIds.map((id) => ({ role_id: id }))
  const { data, error } = await supabase
    .from(TABLE_NAMES.VIEWS)
    .insert(insertData)
    .select()

  if (error) throw error

  verboseLog(`Views recorded successfully: ${data.length} entries`)
  return data
}

// Initialize a batch processor for view count increments
const batchProcessor = {
  queue: new Queue<string>(),
  processing: false,
  lastProcessTime: Date.now(),

  add(roleId: string) {
    this.queue.enqueue(roleId)
    verboseLog(
      `Added roleId ${roleId} to queue. Current size: ${this.queue.size()}`
    )

    if (this.queue.size() >= IMMEDIATE_PROCESS_THRESHOLD && !this.processing) {
      verboseLog(
        `Queue size reached ${IMMEDIATE_PROCESS_THRESHOLD}. Triggering immediate processing.`
      )
      this.process()
    }
  },

  async process() {
    if (this.processing) {
      verboseLog('Already processing. Skipping.')
      return
    }

    this.processing = true
    const roleIdsToProcess = []
    while (!this.queue.isEmpty() && roleIdsToProcess.length < BATCH_SIZE) {
      roleIdsToProcess.push(this.queue.dequeue())
    }

    if (roleIdsToProcess.length > 0) {
      try {
        verboseLog(`Processing ${roleIdsToProcess.length} role IDs`)
        await recordViews(roleIdsToProcess)
        verboseLog(`Successfully processed ${roleIdsToProcess.length} views`)
      } catch (error) {
        console.error('Error processing views:', error)
        // verboseLog('Error occurred. Re-adding role IDs to the queue for retry.')
        // roleIdsToProcess.forEach((id) => this.queue.enqueue(id))
      }
    }

    this.processing = false
    this.lastProcessTime = Date.now()

    if (!this.queue.isEmpty()) {
      verboseLog(`More items in queue. Triggering another process.`)
      this.process()
    }
  },

  async shutdown() {
    verboseLog('Shutting down batch processor')
    while (!this.queue.isEmpty()) {
      verboseLog(
        `Processing remaining ${this.queue.size()} items before shutdown`
      )
      await this.process()
    }
  },
}

// Set up periodic processing
setInterval(() => {
  if (!batchProcessor.queue.isEmpty()) {
    verboseLog(
      `Periodic processing triggered. Current queue size: ${batchProcessor.queue.size()}`
    )
    batchProcessor.process()
  }
}, MAX_WAIT_TIME)

const app = new Elysia()
  .get(
    '/api/role-access',
    async ({ query, set }) => {
      const { roleId } = query
      if (!roleId) {
        verboseLog('Missing roleId parameter')
        set.status = HTTP_STATUS.BAD_REQUEST
        return { error: 'Missing roleId parameter' }
      }
      try {
        verboseLog(`Processing role access for roleId: ${roleId}`)
        // Check Redis first
        let url = await redisClient.hGet(REDIS_KEYS.READY_ROLES, roleId)
        if (!url) {
          verboseLog(
            `Cache miss for roleId: ${roleId}. Fetching from Supabase.`
          )
          // If not in Redis, fetch from Supabase
          const { data, error } = await supabase
            .from(TABLE_NAMES.ROLES)
            .select('url')
            .eq('id', roleId)
            .single()
          if (error) throw error
          if (!data) {
            verboseLog(`Role not found for roleId: ${roleId}`)
            set.status = HTTP_STATUS.NOT_FOUND
            return { error: 'Role not found' }
          }
          url = data.url
          // Cache the result in Redis for future requests
          await redisClient.hSet(REDIS_KEYS.READY_ROLES, roleId, url)
          verboseLog(`Cached roleId: ${roleId} in Redis`)
        }

        // Add roleId to batch processor for view count increment
        batchProcessor.add(roleId)

        verboseLog(`Redirecting to ${url}`)
        // Set redirect status and headers
        set.status = HTTP_STATUS.REDIRECT
        set.headers['Location'] = url
        // Return empty body for redirect
        return ''
      } catch (error) {
        console.error(`Error [${roleId}]:`, error)
        verboseLog('Error occurred in role-access endpoint:', error)
        set.status = HTTP_STATUS.INTERNAL_SERVER_ERROR
        return { error: 'Internal Server Error' }
      }
    },
    {
      query: t.Object({
        roleId: t.String(),
      }),
    }
  )
  .post('/api/update-roles-cache', async ({ set }) => {
    try {
      verboseLog('Updating roles cache')
      const updatedCount = await cacheReadyRoles()
      verboseLog(`Cache update completed. ${updatedCount} roles updated.`)
      return {
        message: `Successfully updated cache with ${updatedCount} roles`,
      }
    } catch (error) {
      console.error('Error updating roles cache:', error)
      verboseLog('Error occurred while updating roles cache:', error)
      set.status = HTTP_STATUS.INTERNAL_SERVER_ERROR
      return { error: 'Failed to update roles cache' }
    }
  })

// Graceful shutdown handler
process.on('SIGTERM', async () => {
  console.log('SIGTERM received. Shutting down gracefully...')
  verboseLog('Beginning graceful shutdown process')
  await batchProcessor.shutdown()
  verboseLog('Batch processor shut down')
  await redisClient.quit()
  verboseLog('Redis client disconnected')
  process.exit(0)
})

if (import.meta.main) {
  const server = Bun.serve({
    fetch: app.fetch,
    port: SERVER_CONFIG.PORT,
  })
  console.log(`Server listening on ${server.url}`)
  verboseLog(`Verbose logging is ${isVerbose ? 'enabled' : 'disabled'}`)
}

export default app
