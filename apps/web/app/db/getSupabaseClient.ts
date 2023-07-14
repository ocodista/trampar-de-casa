import { SupabaseClient, createClient } from 'db'

export const getSupabaseClient = (): SupabaseClient => {
  const client = createClient(
    process.env['SUPABASE_URL'],
    process.env['SUPABASE_SERVICE_ROLE']
  )
  return client
}
