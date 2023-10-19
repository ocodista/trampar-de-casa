import { Collection, Document } from 'mongodb'
import { EmailProps } from './getEmailProps'

export const saveSubscriberRoles = async (
  mongoCollection: Collection<Document>,
  emailProps: EmailProps
) => {
  console.time(`saveSubscriberRoles#${emailProps.email}`)
  await mongoCollection.insertOne(emailProps)
  console.timeEnd(`saveSubscriberRoles#${emailProps.email}`)
}
