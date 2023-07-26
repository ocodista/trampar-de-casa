import { getSupabaseClient } from 'db'
import { RedisClientType, createClient as createRedisClient } from 'redis'
import { getRolesInBatches } from './getRoles'
import { parseAndStoreRole } from './parseAndStoreRole'

async function main() {
  const supabaseClient = getSupabaseClient()
  const redisClient: RedisClientType = createRedisClient()
  await redisClient.connect()

  const BATCH_SIZE = 100
  const roleBatches = getRolesInBatches(supabaseClient, BATCH_SIZE)
  for await (const roles of roleBatches) {
    if (!roles?.length) continue
    await Promise.all(roles.map((role) => parseAndStoreRole(redisClient, role)))
  }
  await redisClient.disconnect()
}
main()