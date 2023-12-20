import { Collection, Document } from 'mongodb'
import { logger } from 'shared'

interface EmailProps {
  email: string
  id: string
  rolesId: string[]
}
export const saveSubscriberRoles = async (
  mongoCollection: Collection<Document>,
  emailProps: EmailProps
) => {
  try {
    await mongoCollection.insertOne(emailProps)
  } catch (e) {
    logger.error(e)
  }
}
