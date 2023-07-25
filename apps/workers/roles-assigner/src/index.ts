import { Subscribers, getSupabaseClient } from 'db'
import { Entities } from 'shared'
import { getAllPaginated } from './getAllPaginated'
import { getSubscriberRoles } from './getSubscriberRoles'

export async function main() {
  const supabaseClient = getSupabaseClient()
  // const redisClient: RedisClientType = createRedisClient()
  // await redisClient.connect()

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
      console.log(roles, subscriber)
      // const emailProps = getEmailProps(subscriber, roles)
      // TODO: Persist redis
    })
    await Promise.all(matchRolesPromises)
  }
}

// eslint-disable-next-line no-console
main().catch((e) => console.error(e))
