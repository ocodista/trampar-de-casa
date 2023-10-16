import { Entities, Views } from 'shared'
import { Database, SupabaseClient, getSupabaseClient } from '../../../'

export const getRolesBlock = async (
  start: number,
  end: number,
  supabase: SupabaseClient<Database>
) => {
  const { data, error } = await supabase
    .from(Views.RoleSkillsView)
    .select('*')
    .eq('ready', true)
    .range(start, end)
    .order('createdAt', { ascending: false })
  if (error) throw error
  return data
}

export async function* getRolesInBatches(
  supabase: SupabaseClient<Database>,
  batchSize: number
) {
  let start = 0
  while (true) {
    const roles = await getRolesBlock(start, start + batchSize - 1, supabase)
    if (roles?.length === 0) break
    yield roles
    start += batchSize
  }
}

export const getRoles = async () => {
  const supabaseClient = getSupabaseClient()
  const { data } = await supabaseClient
    .from(Entities.Roles)
    .select('id, title, url, topicId')
    .eq('ready', true)
  if (!data) return []
  
  return data
}
