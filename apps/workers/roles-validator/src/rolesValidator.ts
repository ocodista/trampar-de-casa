import { createClient } from 'redis'
import { RedisPrefix } from 'shared/src/enums/redis'
import { getRoles } from './getRoles'

export async function rolesValidator() {
  const redisClient = createClient()
  const roles = await getRoles()

  roles.forEach(async ({ id, ready }) => {
    if (ready) return
    await redisClient.del(`${RedisPrefix.RolesRenderer}${id}`)
  })
}
