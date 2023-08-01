import dotenv from 'dotenv'
import { createClient } from 'redis'
import { RedisPrefix } from 'shared/src/enums/redis'
import { getRoles } from './getRoles'
import { isValidRole } from './isValidRole'

dotenv.config()

export async function rolesValidator() {
  const redisClient = createClient()
  await redisClient.connect()
  const roles = await getRoles()

  for (let index = 0; index < roles.length; index++) {
    const { id, url, title } = roles[index]
    if (!url) return
    const isValid = await isValidRole(url, title)
    if (isValid) return

    await redisClient.del(`${RedisPrefix.RolesRenderer}${id}`)
  }

  await redisClient.disconnect()
}
