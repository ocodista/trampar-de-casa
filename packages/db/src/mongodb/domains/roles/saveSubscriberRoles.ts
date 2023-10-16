import { Collection, Document } from 'mongodb'

interface EmailProps {
  email: string
  id: string
  rolesId: string[]
}
export const saveSubscriberRoles = 
  async (mongoCollection: Collection<Document>, emailProps: EmailProps) => {
    await mongoCollection.insertOne(emailProps)
    console.log(emailProps)
  }
