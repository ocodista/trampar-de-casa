import { Subscribers, getSupabaseClient } from 'db'
import dotenv from 'dotenv'
import { RedisClientType, createClient as createRedisClient } from 'redis'
import { Entities } from 'shared'
import { withExecutionTimeLogging } from 'shared/src/observability/withExecutionTimeLogging'
import { getAllPaginated } from './getAllPaginated'
import { getEmailProps } from './getEmailProps'
import { getSubscriberRoles } from './getSubscriberRoles'
import { saveSubscriberRoles } from './saveSubscriberRoles'

dotenv.config()

export const assignRoles = withExecutionTimeLogging(
  async () => {
    let redisClient: RedisClientType | undefined = undefined
    try {
      const supabaseClient = getSupabaseClient()
      redisClient = createRedisClient({
        socket: {
          host: 'redis',
        },
      })
      await redisClient.connect()

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
          await saveSubscriberRoles(redisClient as RedisClientType, emailProps)
        })
        await Promise.allSettled(matchRolesPromises)
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e)
    } finally {
      await redisClient?.disconnect()
    }
  },
  { name: 'assignRoles' }
)
