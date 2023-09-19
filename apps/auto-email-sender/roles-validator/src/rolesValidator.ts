import dotenv from 'dotenv'
import { RedisClientType } from 'redis'
import { Topics } from 'shared'
import { RedisPrefix } from 'shared/src/enums/redis'
import { getRoles } from './getRoles'
import { isValidRole } from './isValidRole'

dotenv.config()

export async function rolesValidator(redisClient: RedisClientType) {
  const roles = await getRoles()
  const deleteFromRedis = async (id: string, topicId: number) => {
    if (topicId === Topics.INTERNATIONAL_VACANCIES)
      await redisClient.del(`${RedisPrefix.InternationalRolesRenderer}${id}`)
    if (topicId === Topics.NATIONAL_VACANCIES)
      await redisClient.del(`${RedisPrefix.NationalRolesRenderer}${id}`)
  }

  for (let index = 0; index < roles.length; index++) {
    const { id, url, title, topicId } = roles[index]
    if (!url) {
      await deleteFromRedis(id, topicId)
      break
    }
    try {
      const isValid = await isValidRole(url, title)
      console.log(url, title, isValid)

      if (!isValid) await deleteFromRedis(id, topicId)
    } catch (e) {
      console.error(`Error on ${url}`)
      console.error(e)
      await deleteFromRedis(id, topicId)
    }
  }
}
