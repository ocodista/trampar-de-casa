import { SupabaseClient, createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
import { Database } from './src/supabase/type'

dotenv.config()
export { SupabaseClient, createClient } from '@supabase/supabase-js'

export * from './src/domains/roles/saveRoles'
export type * from './src/supabase/type'

export const getSupabaseClient = (): SupabaseClient => {
  const client = createClient<Database>(
    process.env['SUPABASE_URL'] || '',
    process.env['SUPABASE_SERVICE_ROLE'] || ''
  )
  return client
}