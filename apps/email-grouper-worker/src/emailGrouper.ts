import { Prisma, Subscribers, SupabaseClient, getSupabaseClient } from 'db'
import { RedisClientType, createClient as createRedisClient } from 'redis'
import { Entities } from 'shared'
import { getSubscribersInBatches } from './getSubscribers'

export async function main() {
  const supabaseClient = getSupabaseClient()
  const redisClient: RedisClientType = createRedisClient()
  await redisClient.connect()

  const batchSize = 100
  const subscribersBatches = getSubscribersInBatches(supabaseClient, batchSize)
  for await (const subscribersBatch of subscribersBatches) {
    if (!subscribersBatch?.length) continue
    await Promise.all(
      subscribersBatch?.map((subscriber) =>
        matchWithRolesAndSave(
          subscriber as unknown as Subscribers,
          supabaseClient
        )
      )
    )
  }
}

async function matchWithRolesAndSave(
  subscriber: Subscribers,
  supabase: SupabaseClient
) {
  const getRolesBasedOnSkill = supabase
    .from(Entities.Roles)
    .select()
    .eq('ready', true)
    .in('skills', ['Java'])

  console.log(await getRolesBasedOnSkill)
}

const supabaseClient = getSupabaseClient()
matchWithRolesAndSave(
  { skills: ['Java', 'Spring Boot'] as Prisma.JsonValue } as Subscribers,
  supabaseClient
)
