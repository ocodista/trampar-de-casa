import { RedisClientType } from 'redis'
import { RedisPrefix } from 'shared/src/enums/redis'

export async function getSubscriberFromRedis(
  redisClient: RedisClientType,
  id: string
) {
  const subscriber = await redisClient.get(`${RedisPrefix.RolesAssigner}${id}`)
  if (!subscriber) return
  const subscriberInfos = JSON.parse(subscriber) as { rolesId: string[] }

  return subscriberInfos
}
