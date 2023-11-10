import { Entities, skillArray } from "shared";
import { getSupabaseClient } from "./src/supabase/getSupabaseClient";

;(async () => {
  const supabase = getSupabaseClient()
  const promises = skillArray.map(async ({id, name, normalized}) => {
    const { error, data } = await supabase
      .from(Entities.Skills)
      .insert({ id, name, normalized })
    return data
  })
  await Promise.all(promises)
})()
