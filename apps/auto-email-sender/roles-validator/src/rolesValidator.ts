import dotenv from 'dotenv'
import { RedisClientType } from 'redis'
import { RedisPrefix } from 'shared/src/enums/redis'
import { getRoles } from './getRoles'
import { isValidRole } from './isValidRole'

dotenv.config()

export async function rolesValidator(redisClient: RedisClientType) {
  const roles = await getRoles()
  const deleteFromRedis = async (id: string) =>
    await redisClient.del(`${RedisPrefix.RolesRenderer}${id}`)

  for (let index = 0; index < roles.length; index++) {
    const { id, url, title } = roles[index]
    if (!url) {
      await deleteFromRedis(id)
      break
    }
    try {
      const isValid = await isValidRole(url, title)
      console.log(url, title, isValid)

      if (!isValid) await deleteFromRedis(id)
    } catch (e) {
      console.error(e)
      await deleteFromRedis(id)
    }
  }
}
