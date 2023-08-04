import { Roles, SupabaseClient } from 'db'
import { Entities } from 'shared'

export const getRolesBlock = async (
  supabase: SupabaseClient,
  start: number,
  end: number
): Promise<Roles[] | undefined> => {
  const { data, error } = await supabase
    .from(Entities.Roles)
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
    console.log(roles)
    if (roles?.length === 0) break
    yield roles
    start += batchSize
  }
}
