import { Subscribers, createClient } from 'db'
import { Entities } from 'shared'

export const confirmedSubscribers = async () => {
  const SUPABASE_URL = process.env['SUPABASE_URL'] || ''
  const SUPABASE_KEY = process.env['SUPABASE_SERVICE_ROLE'] || ''
  const supabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY)
  const { data, error } = await supabaseClient
    .from(Entities.Subcribers)
    .select('*')
    .eq('isConfirmed', 'TRUE')
    .eq('optOut', false)
  if (error) throw error
  return data as Subscribers[]
}
