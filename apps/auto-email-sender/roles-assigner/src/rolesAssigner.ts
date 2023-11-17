import { GetMessage } from 'amqplib'
import { getSupabaseClient } from 'db'
import { saveSubscriberRoles } from 'db/src/mongodb/domains/roles/saveSubscriberRoles'
import { getSubscriberRoles } from 'db/src/supabase/domains/roles/getSubscriberRoles'
import { SupabaseTable } from 'db/src/supabase/utilityTypes'
import dotenv from 'dotenv'
import {
  EmailQueues,
  MongoCollection,
  createRabbitMqChannel,
  getMongoConnection,
} from 'shared'
import { getEmailProps } from './getEmailProps'

dotenv.config()
type Subscriber = SupabaseTable<'Subscribers'>
export const assignRoles = async () => {
  console.time('assignRoles')
  const mongoConnection = await getMongoConnection()
  const mongoDatabase = mongoConnection.db('auto-email-sender')
  const mongoCollection = mongoDatabase.collection(
    MongoCollection.RolesAssigner
  )
  const supabaseClient = getSupabaseClient()
  const channel = await createRabbitMqChannel()
  let msg: GetMessage | false,
    count = 0

  do {
    msg = await channel.get(EmailQueues.RolesAssignerSubs)
    if (!msg) break
    count = count + 1
    const subscriber = JSON.parse(msg.content.toString()) as Subscriber
    try {
      const roles = await getSubscriberRoles(subscriber, supabaseClient)
      const emailProps = getEmailProps(subscriber, roles)
      await saveSubscriberRoles(mongoCollection, emailProps)
      channel.ack(msg)
    } catch (e) {
      console.error(e)
      channel.nack(msg, false, true)
    }
  } while (msg)

  await mongoConnection.close()
  console.timeEnd('assignRoles')
  process.exit(0)
}
