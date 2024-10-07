import { createClient } from 'db'

export default function getSupabaseClient() {
  return createClient(
    process.env['SUPABASE_URL'] as string,
    process.env['SUPABASE_SERVICE_ROLE'] as string
  )
}
