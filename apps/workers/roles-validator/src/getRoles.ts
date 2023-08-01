import { Roles, getSupabaseClient } from 'db'
import { Entities } from 'shared'

export const getRoles = async () => {
  const supabaseClient = getSupabaseClient()
  const { data } = await supabaseClient.from(Entities.Roles).select('id, ready')

  if (!data) return []
  const roles = data as Pick<Roles, 'id' | 'ready'>[]
  return roles
}
