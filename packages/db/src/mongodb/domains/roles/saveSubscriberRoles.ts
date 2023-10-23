import { Collection, Document } from 'mongodb'

interface EmailProps {
  email: string
  id: string
  rolesId: string[]
}
export const saveSubscriberRoles = 
  async (mongoCollection: Collection<Document>, emailProps: EmailProps) => {
    console.time(`saveSubscriberRoles#${emailProps.email}`)
    await mongoCollection.insertOne(emailProps)
    console.timeEnd(`saveSubscriberRoles#${emailProps.email}`)
  }
