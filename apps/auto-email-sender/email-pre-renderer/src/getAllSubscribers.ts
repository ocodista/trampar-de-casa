import { getSupabaseClient } from 'db'
import { Entities } from 'shared'

export const getAllSubscribers = async () => {
  console.time('getAllSubscriber')
  const supabase = getSupabaseClient()
  const { data, error } = await supabase
    .from(Entities.Subcribers)
    .select('id, email')
    .eq('isConfirmed', true)

  console.timeEnd('getAllSubscriber')
  return data
}
