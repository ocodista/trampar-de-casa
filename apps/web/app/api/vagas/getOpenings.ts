import { getSupabaseClient } from 'db'
import { SupabaseView } from 'db/src/supabase/utilityTypes'

type Roles = SupabaseView<'RolesSkillsView'>
export type GetOpeningsParams = Pick<Roles, 'language' | 'country'> & {
  skills: string[]
}
export const getOpenings = async (props: GetOpeningsParams) => {
  const supabase = getSupabaseClient()
  const { data, error } = await supabase
    .from('RolesSkillsView')
    .select('*')
    .eq('ready', true)

  if (error) throw error

  return data
}
