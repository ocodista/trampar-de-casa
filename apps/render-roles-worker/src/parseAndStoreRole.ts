import { Roles } from 'db'
import { RedisClientType } from 'redis'
import { parseHTML } from './parseHTML'

export const parseAndStoreRole = async (
  redisClient: RedisClientType,
  role: Roles
) => {
  const { id } = role
  const html = parseHTML(role)
  await redisClient.set(`role:${id}`, html)
}
