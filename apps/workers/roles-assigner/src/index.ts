import { Subscribers, getSupabaseClient } from 'db'
import { Entities } from 'shared'
import { getAllPaginated } from './getAllPaginated'
import { getSubscriberRoles } from './getSubscriberRoles'
import { getEmailProps } from './getEmailProps'
import { saveSubscriberRoles } from './saveSubscriberRoles'
import { RedisClientType, createClient as createRedisClient } from 'redis'

export async function main() {
  const supabaseClient = getSupabaseClient()
  const redisClient: RedisClientType = createRedisClient()
  await redisClient.connect()

  const batchSize = 100
  for await (const subscribersBatch of getAllPaginated<Subscribers>({
    supabase: supabaseClient,
    entity: Entities.Subcribers,
    batchSize,
  })) {
    if (!subscribersBatch?.length) break

    const matchRolesPromises = subscribersBatch.map(async (subscriber) => {
      const roles = await getSubscriberRoles(subscriber, supabaseClient)
      const emailProps = getEmailProps(subscriber, roles)
      await saveSubscriberRoles(redisClient, emailProps)
    })
    await Promise.all(matchRolesPromises)
  }
}

// eslint-disable-next-line no-console
main().catch((e) => console.error(e))
