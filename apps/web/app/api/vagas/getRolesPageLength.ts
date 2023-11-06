import { getSupabaseClient } from 'db'
import { BATCH_SIZE, GetRolesParams } from './getRoles'

export const getRolesPageLength = async (
  props: Pick<GetRolesParams, 'query'>
) => {
  const supabase = getSupabaseClient()
  const { error, data } = await supabase
    .from('RolesSkillsView')
    .select('id')
    .eq('ready', true)
    .ilike('title', `${props.query || ''}%`)
  if (error) throw error

  return Math.ceil(data.length / BATCH_SIZE)
}
