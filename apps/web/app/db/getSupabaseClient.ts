import { SupabaseClient, createClient } from '@supabase/supabase-js'

export const getSupabaseClient = (): SupabaseClient => {
  const client = createClient(
    process.env['SUPABASE_URL'],
    process.env['SUPABASE_SERVICE_ROLE']
  )
  return client
}
