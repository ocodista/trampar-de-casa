import { getRoles } from 'db/src/supabase/domains/roles/getRoles'
import dotenv from 'dotenv'
import { Collection, Document } from 'mongodb'
import { isValidRole } from './isValidRole'

dotenv.config()

export async function rolesValidator(mongoCollection: Collection<Document>) {
  console.time('rolesValidator')
  const roles = await getRoles()
  const deleteFromMongo = async (id: string) => {
    console.time(`deleteFromMongo#${id}`)
    await mongoCollection.deleteOne({ id })
    console.timeEnd(`deleteFromMongo#${id}`)
  }

  for (const [index, role] of roles.entries()) {
    const { id, url, title } = role
    if (!url) {
      await deleteFromMongo(id)
      break
    }
    try {
      const isValid = await isValidRole(url, title)
      console.log(`Role ${index}/${roles.length}: Valid? ${isValid}`)
      if (!isValid) await deleteFromMongo(id)
    } catch (e) {
      console.error(`Error on ${url}`)
      console.error(e)
      await deleteFromMongo(id)
    }
  }

  console.timeEnd('rolesValidator')
  process.exit(0)
}
