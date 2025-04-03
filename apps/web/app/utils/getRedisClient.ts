import { createClient as createClientRedis } from 'redis'

export async function getRedisClient() {
  const client = createClientRedis({
    socket: {
      host: process.env['REDIS_HOST'],
      port: parseInt(process.env['REDIS_PORT'] || '6379'),
    },
  })
  await client.connect()
  return client
}
