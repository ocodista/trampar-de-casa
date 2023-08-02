import { RedisClientType, createClient } from 'redis'
import { rolesValidator } from './rolesValidator'
const redisClient = createClient({
  socket: {
    keepAlive: false,
  },
})
;(async () => {
  await redisClient.connect()
  await rolesValidator(redisClient as RedisClientType)
})()
  .catch((e) => {
    console.log('Error on rolesValidator', e)
    process.exit(1)
  })
  .finally(async () => {
    await redisClient.disconnect()
    process.exit(0)
  })
