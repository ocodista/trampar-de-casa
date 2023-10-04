import { Subscribers, getSupabaseClient } from 'db'
import dotenv from 'dotenv'
import { Entities, MongoCollection } from 'shared'
import { withExecutionTimeLogging } from 'shared/src/observability/withExecutionTimeLogging'
import { getAllPaginated } from './getAllPaginated'
import { getEmailProps } from './getEmailProps'
import { getSubscriberRoles } from './getSubscriberRoles'
import { getMongoConnection } from './mongo'
import { saveSubscriberRoles } from './saveSubscriberRoles'

dotenv.config()

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
