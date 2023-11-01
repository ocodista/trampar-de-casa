import { getSupabaseClient } from 'db'
import { getRoles } from 'db/src/supabase/domains/roles/getRoles'
import dotenv from 'dotenv'
import { isValidRole } from './isValidRole'

dotenv.config()

export async function rolesValidator() {
  console.time('rolesValidator')
  const supabase = getSupabaseClient()
  const roles = await getRoles()
  const disableRoleOnSupabase = async (id: string) => {
    console.time(`deleteFromMongo#${id}`)
    const { error } = await supabase
      .from('Roles')
      .update({ ready: false })
      .eq('id', id)
    if (error) {
      console.timeEnd(`deleteFromMongo#${id}`)

      throw error
    }
    console.timeEnd(`deleteFromMongo#${id}`)
  }

  for (let index = 0; index < roles.length; index++) {
    const { id, url, title } = roles[index]
    if (!url) {
      await disableRoleOnSupabase(id)
      break
    }
    try {
      const isValid = await isValidRole(url, title)
      console.log(url, title, isValid)

      if (!isValid) await disableRoleOnSupabase(id)
    } catch (e) {
      console.error(`Error on ${url}`)
      console.error(e)
      await disableRoleOnSupabase(id)
    }
  }

  console.timeEnd('rolesValidator')
}
