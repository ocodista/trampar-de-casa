import { RolesSkillsView } from 'getRoles'
import { RedisClientType } from 'redis'
import { Topics } from 'shared'
import { RedisPrefix } from 'shared/src/enums/redis'
import { parseHTML } from './parseHTML'

export const parseAndStoreRole = async (
  redisClient: RedisClientType,
  role: RolesSkillsView
) => {
  const { id } = role
  const html = parseHTML(role)
  if (role.topicId === Topics.INTERNATIONAL_VACANCIES) {
    await redisClient.set(
      `${RedisPrefix.InternationalRolesRenderer}${id}`,
      html
    )
  }
  if (role.topicId === Topics.NATIONAL_VACANCIES) {
    await redisClient.set(`${RedisPrefix.NationalRolesRenderer}${id}`, html)
  }
}
