import { Roles, SupabaseClient } from 'db'
import { Entities } from 'shared'

interface GetRowsBlock {
  supabase: SupabaseClient
  entity: Entities
  start: number
  end: number
}

export const getRowsBlock = async ({
  supabase,
  entity,
  start,
  end,
}: GetRowsBlock): Promise<Roles[]> => {
  const { data, error } = await supabase
    .from(entity)
    .select('*')
    // .eq('ready', true)
    .range(start, end)
    .order('createdAt', { ascending: false })
  if (error) throw error
  return data as Roles[]
}
