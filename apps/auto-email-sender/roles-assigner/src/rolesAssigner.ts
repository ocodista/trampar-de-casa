import { getSupabaseClient } from 'db'
import { saveSubscriberRoles } from 'db/src/mongodb/domains/roles/saveSubscriberRoles'
import { getSubscriberRoles } from 'db/src/supabase/domains/roles/getSubscriberRoles'
import { getAllConfirmedSubscribersPaginated } from 'db/src/supabase/domains/subscribers/getAllConfirmedSubscribersPaginated'
import dotenv from 'dotenv'
import { MongoCollection, getMongoConnection } from 'shared'
import { getEmailProps } from './getEmailProps'

dotenv.config()

const BATCH_SIZE = 1_000
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
    selectQuery: 'skillsId,startedWorkingAt,id,email,isConfirmed',
  })
  let count = 0
  for await (const subscribersBatch of subscribersGenerator) {
    console.log({ subscribersBatch })
    count += subscribersBatch?.length || 0
    console.log(`Processing ${count}...`)
    console.time(`Processed ${count}`)
    if (!subscribersBatch?.length) break

    const matchRolesPromises = subscribersBatch.map(async (subscriber) => {
      if (!subscriber.isConfirmed) return
      try {
        const roles = await getSubscriberRoles(subscriber, supabaseClient)
        const emailProps = getEmailProps(subscriber, roles)
        await saveSubscriberRoles(mongoCollection, emailProps)
      } catch (e) {
        console.error(e)
      }
    })
    await Promise.allSettled(matchRolesPromises)
    console.timeEnd(`Processed ${count}`)
  }

  await mongoConnection.close()
  console.timeEnd('assignRoles')
  process.exit(0)
}
