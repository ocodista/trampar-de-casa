'use server'

import { getSupabaseClient } from 'db'

export async function isInternalRole(roleId: string): Promise<boolean> {
  const supabase = getSupabaseClient()

  const { data, error } = await supabase
    .from('RoleOwner')
    .select('*')
    .eq('roleID', roleId)
    .single()

  if (error) {
    return false
  }

  return Boolean(data)
}
