import { getSupabaseClient } from 'db'
import { saveSubscriberRoles } from 'db/src/mongodb/domains/roles/saveSubscriberRoles'
import { getSubscriberRoles } from 'db/src/supabase/domains/roles/getSubscriberRoles'
import { getAllPaginated } from 'db/src/supabase/getAllPaginated'
import { SupabaseTable } from 'db/src/supabase/utilityTypes'
import dotenv from 'dotenv'
import { Entities, MongoCollection, getMongoConnection } from 'shared'
import { withExecutionTimeLogging } from 'shared/src/observability/withExecutionTimeLogging'
import { getEmailProps } from './getEmailProps'

dotenv.config()

type Subscribers = SupabaseTable<'Subscribers'>

export const assignRoles = withExecutionTimeLogging(
  async () => {
    const mongoConnection = await getMongoConnection()
    const mongoDatabase = mongoConnection.db('auto-email-sender')
    const mongoCollection = mongoDatabase.collection(
      MongoCollection.RolesAssigner
    )
    const supabaseClient = getSupabaseClient()

    const batchSize = 100
    for await (const subscribersBatch of getAllPaginated<Subscribers>({
      supabase: supabaseClient,
      entity: Entities.Subcribers,
      batchSize,
    })) {
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
  },
  { name: 'assignRoles' }
)
