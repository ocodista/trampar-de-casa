import { SupabaseClient, rolesSkillsView } from 'db'
import { Views } from 'shared'

export const getRolesBlock = async (
  supabase: SupabaseClient,
  start: number,
  end: number
): Promise<Array<rolesSkillsView & { company: string }> | undefined> => {
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
  supabase: SupabaseClient,
  batchSize: number
) {
  let start = 0
  while (true) {
    const roles = await getRolesBlock(supabase, start, start + batchSize - 1)
    if (roles?.length === 0) break
    yield roles
    start += batchSize
  }
}
