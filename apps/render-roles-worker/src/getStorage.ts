import { createClient } from 'redis'

export const getStorage = async () => {
  const redisClient = createClient()
  redisClient.on('error', (err) => console.log('Redis Client Error', err))
  await redisClient.connect()
  return redisClient
}
