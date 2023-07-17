import { Roles, SupabaseClient } from 'db'
import { Entities } from 'shared'

const getAllTableRows = (
  supabase: SupabaseClient,
  batchSize: number,
  entity: Entities
) => {
  const getSubscribersBlock = async (
    supabase: SupabaseClient,
    start: number,
    end: number
  ): Promise<Roles[] | undefined> => {
    const { data, error } = await supabase
      .from(entity)
      .select('*')
      .eq('ready', true)
      .range(start, end)
      .order('createdAt', { ascending: false })
    if (error) throw error
    return data
  }

  async function* getRolesInBatches() {
    let start = 0
    while (true) {
      const roles = await getSubscribersBlock(
        supabase,
        start,
        start + batchSize - 1
      )
      if (roles?.length === 0) break
      yield roles
      start += batchSize
    }
  }

  return getRolesInBatches()
}

export const getSubscribersInBatches = (
  supabase: SupabaseClient,
  batchSize: number
) => getAllTableRows(supabase, batchSize, Entities.Subcribers)
