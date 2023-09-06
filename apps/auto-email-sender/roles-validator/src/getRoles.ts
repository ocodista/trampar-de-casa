import { Roles, getSupabaseClient } from 'db'
import { Entities } from 'shared'

export const getRoles = async () => {
  const supabaseClient = getSupabaseClient()
  const { data } = await supabaseClient
    .from(Entities.Roles)
    .select('id, title, url, topicId')
    .eq('ready', true)
  if (!data) return []
  const roles = data as Array<
    Pick<Roles, 'id' | 'title' | 'url'> & { topicId: number }
  >
  return roles
}
