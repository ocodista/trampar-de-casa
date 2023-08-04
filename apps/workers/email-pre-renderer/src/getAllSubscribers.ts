import { getSupabaseClient } from 'db'
import { Entities } from 'shared'

export const getAllSubscribers = async () => {
  const supabase = getSupabaseClient()
  const { data, error } = await supabase
    .from(Entities.Subcribers)
    .select('id, email')
    .eq('ready', true)

  return data
}
