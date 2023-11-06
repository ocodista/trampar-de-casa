import { getSupabaseClient } from 'db'
import { BATCH_SIZE } from './getOpenings'

export const getOpeningsPageLength = async () => {
  const supabase = getSupabaseClient()
  const { error, data } = await supabase
    .from('RolesSkillsView')
    .select('id')
    .eq('ready', true)
  if (error) throw error
  return Math.ceil(data.length / BATCH_SIZE)
}
