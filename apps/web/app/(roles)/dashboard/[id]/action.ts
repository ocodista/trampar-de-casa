'use server'

import { getSupabaseClient } from 'db'

export const toggleRoleActive = async (
  jobId: string | number,
  active: boolean
) => {
  const supabase = getSupabaseClient()
  const { data, error } = await supabase
    .from('Roles')
    .update({ ready: active })
    .eq('id', jobId)

  if (error) {
    throw error
  }

  return data
}
