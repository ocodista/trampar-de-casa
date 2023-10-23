import { getSupabaseClient } from 'db'
import { saveSubscriberRoles } from 'db/src/mongodb/domains/roles/saveSubscriberRoles'
import { getSubscriberRoles } from 'db/src/supabase/domains/roles/getSubscriberRoles'
import { getAllConfirmedSubscribersPaginated } from 'db/src/supabase/domains/subscribers/getAllConfirmedSubscribersPaginated'
import dotenv from 'dotenv'
import { MongoCollection, getMongoConnection } from 'shared'
import { getEmailProps } from './getEmailProps'

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
  const subscribersGenerator = getAllConfirmedSubscribersPaginated({
    batchSize: BATCH_SIZE,
    supabase: supabaseClient,
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
