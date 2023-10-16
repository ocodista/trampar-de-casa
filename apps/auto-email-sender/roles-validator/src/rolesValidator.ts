import { getRoles } from 'db/src/supabase/domains/roles/getRoles'
import dotenv from 'dotenv'
import { Collection, Document } from 'mongodb'
import { isValidRole } from './isValidRole'

dotenv.config()

export async function rolesValidator(mongoCollection: Collection<Document>) {
  const roles = await getRoles()
  const deleteFromMongo = async (id: string) => {
    await mongoCollection.deleteOne({ id })
  }

  for (let index = 0; index < roles.length; index++) {
    const { id, url, title } = roles[index]
    if (!url) {
      await deleteFromMongo(id)
      break
    }
    try {
      const isValid = await isValidRole(url, title)
      console.log(url, title, isValid)

      if (!isValid) await deleteFromMongo(id)
    } catch (e) {
      console.error(`Error on ${url}`)
      console.error(e)
      await deleteFromMongo(id)
    }
  }
}
