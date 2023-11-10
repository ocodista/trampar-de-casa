import { getSupabaseClient } from "./src/supabase/getSupabaseClient";
const deleteSKills = [
  {
    id: 78,
    name: 'MongoDB',
    replaceFor: 432
  },
  {
    id: 289,
    name: 'Swift',
    replaceFor: 122
  }
] as const

;(async () => {
  const supabase = getSupabaseClient()
  const promises = deleteSKills.map(async ({id, replaceFor}) => {
    const { error } = await supabase.rpc('replace_skills', {
      skill_to_delete_id: id,
      replace_with_id: replaceFor
    })
    if (error) {
      console.log(error)
      return;
    }
    console.info("updated successfully!")
  })

  await Promise.all(promises)
})()