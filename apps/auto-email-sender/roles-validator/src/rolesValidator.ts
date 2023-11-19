import { getRoles } from 'db/src/supabase/domains/roles/getRoles'
import dotenv from 'dotenv'
import { Collection, Document } from 'mongodb'
import { isValidRole } from './isValidRole'

dotenv.config()

export async function rolesValidator(mongoCollection: Collection<Document>) {
  console.time('rolesValidator')
  const roles = await getRoles()
  console.log(`got ${roles.length} roles!`)
  const deleteFromMongo = async (id: string) => {
    console.time(`deleteFromMongo#${id}`)
    await mongoCollection.deleteOne({ id })
    console.timeEnd(`deleteFromMongo#${id}`)
  }

  for (const [_index, role] of roles.entries()) {
    const { id, url, title } = role
    if (!url) {
      await deleteFromMongo(id)
      break
    }
    try {
      const isValid = await isValidRole(url, title)
      if (!isValid) {
        console.log(url)
        await deleteFromMongo(id)
      }
    } catch (e) {
      console.error(`Error on ${url}`)
      console.error(e)
      await deleteFromMongo(id)
    }
  }

  console.timeEnd('rolesValidator')
}
