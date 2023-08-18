import { createClient } from 'redis'
import { RedisPrefix } from 'shared/src/enums/redis'

export const getHtmlRoles = async (rolesId: string[]) => {
  let concatenatedHtmlRoles = ''
  const redisClient = createClient({
    socket: {
      host: 'redis',
    },
  })
  await redisClient.connect()

  for (let index = 0; index < rolesId.length; index++) {
    const roleId = rolesId[index]

    const roleHtml = await redisClient.get(
      `${RedisPrefix.RolesRenderer}${roleId}`
    )
    if (!roleHtml) break
    concatenatedHtmlRoles = `${concatenatedHtmlRoles}${roleHtml}`
  }
  await redisClient.disconnect()
  return concatenatedHtmlRoles
}
