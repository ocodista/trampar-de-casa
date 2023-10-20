import dotenv from 'dotenv'
import { Collection, Document } from 'mongodb'
import { getRoles } from './getRoles'
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

  console.timeEnd('rolesValidator')
}
