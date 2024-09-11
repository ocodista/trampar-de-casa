import { Elysia, t } from 'elysia'
import { Database } from 'bun:sqlite'
import { createClient } from '@supabase/supabase-js'
import { createClient as createRedisClient } from 'redis'

// Constants
const ENV_VARS = {
  SUPABASE_URL: 'SUPABASE_URL',
  SUPABASE_ANON_KEY: 'SUPABASE_ANON_KEY',
  REDIS_URL: 'REDIS_URL',
}

const DB_CONFIG = {
  FILENAME: 'views.sqlite',
  PRAGMA: 'PRAGMA journal_mode = WAL;',
}

const TABLE_NAMES = {
  VIEWS: 'views',
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

// Read environment variables
const supabaseUrl = process.env[ENV_VARS.SUPABASE_URL]
const supabaseAnonKey = process.env[ENV_VARS.SUPABASE_ANON_KEY]
const redisUrl = process.env[ENV_VARS.REDIS_URL]

if (!supabaseUrl || !supabaseAnonKey || !redisUrl) {
  console.error(
    `${ENV_VARS.SUPABASE_URL}, ${ENV_VARS.SUPABASE_ANON_KEY}, and ${ENV_VARS.REDIS_URL} environment variables must be set`
  )
  process.exit(1)
}

// Initialize Supabase client
const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Initialize Redis client
const redisClient = createRedisClient({ url: redisUrl })
await redisClient.connect()

// SQLite setup
const db = new Database(DB_CONFIG.FILENAME, { create: true })
db.exec(DB_CONFIG.PRAGMA)
db.exec(`
  CREATE TABLE IF NOT EXISTS ${TABLE_NAMES.VIEWS} (
    id INTEGER PRIMARY KEY,
    count INTEGER DEFAULT 0
  ) WITHOUT ROWID;
`)

// Prepare statements
const incrementViewCount = db.prepare(
  `INSERT OR REPLACE INTO ${TABLE_NAMES.VIEWS} (id, count) VALUES (?, COALESCE((SELECT count FROM ${TABLE_NAMES.VIEWS} WHERE id = ?) + 1, 1))`
)
const getViewCount = db.prepare(
  `SELECT count FROM ${TABLE_NAMES.VIEWS} WHERE id = ?`
)
const getAllRoles = db.prepare(
  `SELECT id, count FROM ${TABLE_NAMES.VIEWS} ORDER BY count DESC`
)

// Function to fetch ready roles from Supabase and cache in Redis
async function cacheReadyRoles() {
  console.log('Fetching ready roles from Supabase')
  const { data, error } = await supabase
    .from(TABLE_NAMES.ROLES)
    .select('id, url')
    .eq('ready', true)
  if (error) throw error
  const pipeline = redisClient.multi()
  for (const role of data) {
    pipeline.hSet(REDIS_KEYS.READY_ROLES, role.id, role.url)
  }
  await pipeline.exec()
  console.log(`Cached ${data.length} ready roles in Redis`)
}

// Check if Redis has "ready_roles" collection, if not, populate it
const readyRolesExist = await redisClient.exists(REDIS_KEYS.READY_ROLES)
if (!readyRolesExist) {
  await cacheReadyRoles()
}

const app = new Elysia()
  .get(
    '/api/role-access',
    async ({ query, set }) => {
      const { roleId } = query
      if (!roleId) {
        set.status = HTTP_STATUS.BAD_REQUEST
        return { error: 'Missing roleId parameter' }
      }
      try {
        // Check Redis first
        let url = await redisClient.hGet(REDIS_KEYS.READY_ROLES, roleId)
        if (!url) {
          console.log(
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
            set.status = HTTP_STATUS.NOT_FOUND
            return { error: 'Role not found' }
          }
          url = data.url
          // Cache the result in Redis for future requests
          await redisClient.hSet(REDIS_KEYS.READY_ROLES, roleId, url)
          console.log(`Cached roleId: ${roleId} in Redis`)
        }
        // Increment view count in SQLite
        incrementViewCount.run(roleId, roleId)
        // Get updated view count
        const { count } = getViewCount.get(roleId) as { count: number }
        // Set redirect status and headers
        set.status = HTTP_STATUS.REDIRECT
        set.headers['Location'] = url
        set.headers['X-View-Count'] = count.toString()
        // Return empty body for redirect
        return ''
      } catch (error) {
        console.error('Error:', error)
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
  .get('/api/roles', async ({ set }) => {
    try {
      const roles = getAllRoles.all() as { id: number; count: number }[]
      const rolesWithUrls = await Promise.all(
        roles.map(async (role) => {
          const url = await redisClient.hGet(
            REDIS_KEYS.READY_ROLES,
            role.id.toString()
          )
          return {
            id: role.id,
            url: url || null,
            count: role.count,
          }
        })
      )
      return rolesWithUrls
    } catch (error) {
      console.error('Error:', error)
      set.status = HTTP_STATUS.INTERNAL_SERVER_ERROR
      return { error: 'Internal Server Error' }
    }
  })

if (import.meta.main) {
  const server = Bun.serve({
    fetch: app.fetch,
    port: SERVER_CONFIG.PORT,
  })
  console.log(`Server listening on ${server.url}`)
}

export default app
