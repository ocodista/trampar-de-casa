import { Collection, Document } from 'mongodb'

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
    console.error(e)
  }
}
