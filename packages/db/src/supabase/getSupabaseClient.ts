import { SupabaseClient, createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
import { Database } from './type'

dotenv.config()
export const getSupabaseClient = (): SupabaseClient<Database> => {
  throw new Error('Supabase is not supported in this project')

  const client = createClient<Database>(
    process.env['SUPABASE_URL'] || '',
    process.env['SUPABASE_SERVICE_ROLE'] || ''
  )
  return client
}

