import { Roles, getSupabaseClient } from 'db'
import { Entities } from 'shared'

export const getRoles = async () => {
  const supabaseClient = getSupabaseClient()
  const { data } = await supabaseClient
    .from(Entities.Roles)
    .select('id, title, url')
    .eq('ready', true)
  if (!data) return []
  const roles = data as Pick<Roles, 'id' | 'title' | 'url'>[]
  return roles
}
