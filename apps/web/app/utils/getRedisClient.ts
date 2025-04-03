import { createClient as createClientRedis } from 'redis'

export async function getRedisClient() {
  const client = createClientRedis({
    url: process.env['REDIS_URL'],
  })
  await client.connect()
  return client
}
