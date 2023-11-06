import { getSupabaseClient } from 'db'
import { SupabaseView } from 'db/src/supabase/utilityTypes'

export const BATCH_SIZE = 10

type Roles = SupabaseView<'RolesSkillsView'>
export type GetOpeningsParams = Partial<Pick<Roles, 'language' | 'country'>> & {
  skills?: string[]
  page: number
}

export const getOpenings = async (props: GetOpeningsParams) => {
  const batchSize = BATCH_SIZE - 1
  const startRange = props.page < 1 ? 0 : (props.page - 1) * batchSize
  const supabase = getSupabaseClient()

  const { data, error } = await supabase
    .from('RolesSkillsView')
    .select('*')
    .range(startRange, startRange + batchSize)
    .eq('ready', true)

  if (error) throw error

  return data
}
