import { createClient as createClientRedis } from 'redis'

export async function getRedisClient() {
  console.log('🔌 Connecting to Redis...')
  const client = createClientRedis({
    url: process.env['REDIS_URL'],
  })

  client.on('error', (err) => {
    console.error('❌ Redis connection error:', err.message, { err })
  })

  try {
    await client.connect()
    console.log('✅ Connected to Redis successfully')
    return client
  } catch (error) {
    console.error(
      '❌ Failed to connect to Redis:',
      error instanceof Error ? error.message : String(error)
    )
    throw error
  }
}
