import { getRoles } from 'db/src/supabase/domains/roles/getRoles'
import dotenv from 'dotenv'
import { Collection, Document } from 'mongodb'
import { logger } from 'shared'
import { isValidRole } from './isValidRole'

dotenv.config()

export async function rolesValidator(mongoCollection: Collection<Document>) {
  logger.time('rolesValidator')
  const roles = await getRoles()
  logger(`got ${roles.length} roles!`)
  const deleteFromMongo = async (id: string) => {
    logger.time(`deleteFromMongo#${id}`)
    await mongoCollection.deleteOne({ id })
    logger.timeEnd(`deleteFromMongo#${id}`)
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
        logger(url)
        await deleteFromMongo(id)
      }
    } catch (e) {
      logger.error(`Error on ${url}`)
      logger.error(e)
      await deleteFromMongo(id)
    }
  }

  logger.timeEnd('rolesValidator')
}
