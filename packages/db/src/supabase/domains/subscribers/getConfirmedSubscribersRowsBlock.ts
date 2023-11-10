import { SupabaseClient } from 'db'
import { Entities } from 'shared'

interface GetRowsBlock {
  supabase: SupabaseClient
  selectQuery?: string
  start: number
  end: number
}

export const getConfirmedSubscribersRowsBlock = async <Entity>({
  supabase,
  start,
  end,
  selectQuery
}: GetRowsBlock): Promise<Entity[]> => {
  const { data, error } = await supabase
    .from(Entities.Subcribers)
    .select(selectQuery || '*')
    .eq('isConfirmed', true)
    .eq('optOut', false)
    .range(start, end)
    .order('createdAt', { ascending: false })
  if (error) throw error
  return data as Entity[]
}
