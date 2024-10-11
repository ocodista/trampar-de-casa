import { SupabaseClient, createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
import { Database } from './type'

dotenv.config()

export const getSupabaseClient = (): SupabaseClient<Database> => {
  const client = createClient<Database>(
    process.env['SUPABASE_URL'] || '',
    process.env['SUPABASE_SERVICE_ROLE'] || '',
    {
      global: {
        fetch: (url: any, options = {}) => {
          return fetch(url, { ...options, cache: 'no-store' })
        }
      }
    }
  )
  return client
}
