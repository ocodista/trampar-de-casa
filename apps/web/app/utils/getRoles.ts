import { getSupabaseClient } from 'db'

export async function getRole(id: string) {
  const supabase = getSupabaseClient()
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
