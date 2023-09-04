import { SupabaseClient, createClient } from '@supabase/supabase-js'

export { SupabaseClient, createClient } from '@supabase/supabase-js'
export * from './prisma/client'
export * from './src/saveOpenings'
// import { PrismaClient } from './prisma/client'
// export const prisma = new PrismaClient()
export const getSupabaseClient = (): SupabaseClient => {
  const client = createClient(
    process.env['SUPABASE_URL'] || '',
    process.env['SUPABASE_SERVICE_ROLE'] || ''
  )
  return client
}