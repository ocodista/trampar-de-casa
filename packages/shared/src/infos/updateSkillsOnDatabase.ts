import { getSupabaseClient } from 'db'
import { skillArray } from './skills'

export const updateSkillsOnDatabase = async () => {
  const supabase = getSupabaseClient()
  for (const { id, name, normalized } of skillArray) {
    const { error } = await supabase.from('Skills').upsert(
      {
        id,
        name,
        normalized,
      },
      { onConflict: 'id' }
    )
    if (error) throw error
  }
}

updateSkillsOnDatabase()
