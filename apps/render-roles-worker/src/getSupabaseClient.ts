import { createClient } from 'db'
import dotenv from 'dotenv'
dotenv.config()

//TODO: Use getSupabaseCLient from common
export const getSupabaseClient = () => {
  const SUPABASE_URL = process.env['SUPABASE_URL'] || ''
  const SUPABASE_KEY = process.env['SUPABASE_SERVICE_ROLE'] || ''

  return createClient(SUPABASE_URL, SUPABASE_KEY)
}
