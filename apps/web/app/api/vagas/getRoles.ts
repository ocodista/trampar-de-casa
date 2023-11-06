import { getSupabaseClient } from 'db'
import { SupabaseView } from 'db/src/supabase/utilityTypes'

export const BATCH_SIZE = 10

type Roles = SupabaseView<'RolesSkillsView'>
export type GetRolesParams = Partial<Pick<Roles, 'language' | 'country'>> & {
  skills?: string[]
  page: number
  query?: string
}

export const getRoles = async (props: GetRolesParams) => {
  const batchSize = BATCH_SIZE - 1
  const startRange = props.page < 1 ? 0 : (props.page - 1) * batchSize
  const supabase = getSupabaseClient()

  const { data, error } = await supabase
    .from('RolesSkillsView')
    .select('*')
    .eq('ready', true)
    .ilike('title', `${props.query || ''}%`)
    .range(startRange, startRange + batchSize)

  if (error) throw error

  return data
}
