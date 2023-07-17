export { SupabaseClient, createClient } from '@supabase/supabase-js';
export * from './prisma/client';
import { createClient } from 'db';
import dotenv from 'dotenv';
dotenv.config()

export const getSupabaseClient = () => {
  const SUPABASE_URL = process.env['SUPABASE_URL'] || ''
  const SUPABASE_KEY = process.env['SUPABASE_SERVICE_ROLE'] || ''

  return createClient(SUPABASE_URL, SUPABASE_KEY)
}
// import { PrismaClient } from './prisma/client'
// export const prisma = new PrismaClient()