import { rolesSkillsView } from 'db'
import { RedisClientType } from 'redis'
import { RedisPrefix } from 'shared/src/enums/redis'
import { parseHTML } from './parseHTML'

export const parseAndStoreRole = async (
  redisClient: RedisClientType,
  role: rolesSkillsView & { company: string }
) => {
  const { id } = role
  const html = parseHTML(role)
  await redisClient.set(`${RedisPrefix.RolesRenderer}${id}`, html)
}
