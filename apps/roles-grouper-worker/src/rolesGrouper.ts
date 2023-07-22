import { Subscribers, getSupabaseClient } from 'db'
import { RedisClientType, createClient as createRedisClient } from 'redis'
import { Entities } from 'shared'
import { getAllPaginated } from './getAllPaginated'
import { getSubscriberRoles } from './getSubscriberRoles'
import { getEmailProps } from './getEmailProps'

export async function main() {
  const supabaseClient = getSupabaseClient()
  const redisClient: RedisClientType = createRedisClient()
  await redisClient.connect()

  const batchSize = 100
  for await (const subscribersBatch of getAllPaginated({
    supabase: supabaseClient,
    entity: Entities.Subcribers,
    batchSize,
  })) {
    if (!subscribersBatch?.length) break

    const matchRolesPromises = (
      subscribersBatch as unknown as Subscribers[]
    ).map(async (subscriber) => {
      const roles = await getSubscriberRoles(subscriber, supabaseClient)
      const emailProps = getEmailProps(subscriber, roles)
      // TODO: Persist redis
    })
    await Promise.all(matchRolesPromises)
  }
}
