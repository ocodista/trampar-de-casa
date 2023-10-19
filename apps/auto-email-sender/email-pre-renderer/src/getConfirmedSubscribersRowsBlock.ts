import { SupabaseClient } from 'db'
import { Entities } from 'shared'

interface GetRowsBlock {
  supabase: SupabaseClient
  entity: Entities
  start: number
  end: number
}

export const getConfirmedSubscribersRowsBlock = async <Entity>({
  supabase,
  entity,
  start,
  end,
}: GetRowsBlock): Promise<Entity[]> => {
  const { data, error } = await supabase
    .from(entity)
    .select('*')
    .eq('isConfirmed', true)
    .range(start, end)
    .order('createdAt', { ascending: false })
  if (error) throw error
  return data as Entity[]
}
