import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL as string,
  process.env.SUPABASE_SERVICE_ROLE as string
)

export async function getRole(id: string) {
  const { data: role, error } = await supabase
    .from('Roles')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    throw new Error('Error fetching role: ' + error.message)
  }

  return role
}
