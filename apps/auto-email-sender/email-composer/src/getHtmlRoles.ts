import { createClient } from 'redis'
import { RedisPrefix } from 'shared/src/enums/redis'
import { RenderRolesSection } from './renderRolesSection'

export const getHtmlRoles = async (rolesId: string[]) => {
  let internationalRoles = ''
  let internationalCount = 0
  let nationalRoles = ''
  let nationalCount = 0
  const redisClient = createClient({
    socket: {
      host: 'redis',
    },
  })
  await redisClient.connect()

  for (let index = 0; index < rolesId.length; index++) {
    const roleId = rolesId[index]

    const internationalRole = await redisClient.get(
      `${RedisPrefix.InternationalRolesRenderer}${roleId}`
    )
    const nationalRole = await redisClient.get(
      `${RedisPrefix.NationalRolesRenderer}${roleId}`
    )
    if (internationalRole) {
      internationalCount++
      internationalRoles += internationalRole
    }
    if (nationalRole) {
      nationalCount++
      nationalRoles += nationalRole
    }
  }
  await redisClient.disconnect()

  return RenderRolesSection({
    international: {
      count: internationalCount,
      value: internationalRoles,
    },
    national: {
      count: nationalCount,
      value: nationalRoles,
    },
  })
}
