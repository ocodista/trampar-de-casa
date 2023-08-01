import { getSupabaseClient } from 'db'
import { createClient } from 'redis'
import { Entities } from 'shared'
import { RedisPrefix } from 'shared/src/enums/redis'

export const filterRoles = async (rolesId: string[]) => {
  const filteredRoles: Record<string, string> = {}
  const supabase = getSupabaseClient()
  const redisClient = createClient()
  await redisClient.connect()

  const getReadyRole = async (roleId: string) => {
    const { data } = await supabase
      .from(Entities.Roles)
      .select('*')
      .eq('id', roleId)
      .eq('ready', 'TRUE')

    return data
  }

  rolesId.forEach(async (roleId) => {
    const data = await getReadyRole(roleId)
    if (!data?.length) return

    const roleHtml = await redisClient.get(`${RedisPrefix}${roleId}`)
    if (!roleHtml) return
    filteredRoles[roleId] = roleHtml
  })

  await redisClient.disconnect()
  return filteredRoles
}
