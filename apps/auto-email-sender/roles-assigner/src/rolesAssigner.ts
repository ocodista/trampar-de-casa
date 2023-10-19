import { Subscribers, getSupabaseClient } from 'db'
import dotenv from 'dotenv'
import { Entities, MongoCollection, getMongoConnection } from 'shared'
import { getAllPaginated } from './getAllPaginated'
import { getEmailProps } from './getEmailProps'
import { getSubscriberRoles } from './getSubscriberRoles'
import { saveSubscriberRoles } from './saveSubscriberRoles'

dotenv.config()

const BATCH_SIZE = 100
export const assignRoles = async () => {
  console.time('assignRoles')
  const mongoConnection = await getMongoConnection()
  const mongoDatabase = mongoConnection.db('auto-email-sender')
  const mongoCollection = mongoDatabase.collection(
    MongoCollection.RolesAssigner
  )
  const supabaseClient = getSupabaseClient()
  const subscribersGenerator = getAllPaginated<Subscribers>({
    supabase: supabaseClient,
    entity: Entities.Subcribers,
    batchSize: BATCH_SIZE,
  })
  for await (const subscribersBatch of subscribersGenerator) {
    if (!subscribersBatch?.length) break

    const matchRolesPromises = subscribersBatch.map(async (subscriber) => {
      if (!subscriber.isConfirmed) return
      const roles = await getSubscriberRoles(subscriber, supabaseClient)
      const emailProps = getEmailProps(subscriber, roles)
      await saveSubscriberRoles(mongoCollection, emailProps)
    })
    await Promise.allSettled(matchRolesPromises)
  }

  await mongoConnection.close()
  console.timeEnd('assignRoles')
}
