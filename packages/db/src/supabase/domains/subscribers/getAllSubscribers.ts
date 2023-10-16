import { Entities } from 'shared'
import type { Database, SupabaseClient } from '../../../../index'
export const getAllSubscribers = async (
  supabase: SupabaseClient<Database>
) => {
  const { data, error } = await supabase
    .from(Entities.Subcribers)
    .select('id, email')
    .eq('isConfirmed', true)
  
  return data
}
