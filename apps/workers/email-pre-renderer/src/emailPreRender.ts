import { Subscribers, getSupabaseClient } from 'db'
import { RedisClientType, createClient as createRedisClient } from 'redis'
import { Entities } from 'shared'
import { RedisPrefix } from 'shared/src/enums/redis'
import { getAllPaginated } from 'shared/src/services/getAllPaginated'
import { promisify } from 'util'
import { CONFIG } from './config'
import { connectToQueue } from './connectOnQueue'
import { renderFooter } from './renderFooter'
import { renderHeader } from './renderHeader'
import { sendToQueue } from './sendToQueue'

export async function emailPreRender() {
  const redisClient = createRedisClient() as RedisClientType
  const channel = await connectToQueue()
  const supabase = getSupabaseClient()
  await redisClient.connect()

  const batchSize = 100
  const subscribersChunk = getAllPaginated<Subscribers>({
    batchSize,
    entity: Entities.Subcribers,
    supabase,
  })

  for await (const subscribers of subscribersChunk) {
    subscribers.forEach(async ({ id, email }) => {
      const subscriber = await redisClient.get(
        `${RedisPrefix.RolesAssigner}${id}`
      )
      if (!subscriber) return
      const { rolesId } = JSON.parse(subscriber) as { rolesId: string[] }
      if (!subscriber) return

      const asyncRenderFooter = promisify<string, string, string>(renderFooter)
      const asyncRenderHeader = promisify<string[], string>(renderHeader)
      const [footerHTML, headerHTML] = await Promise.all([
        asyncRenderFooter(id, CONFIG.URL_PREFIX),
        asyncRenderHeader(rolesId),
      ])

      await sendToQueue(channel, {
        [email]: {
          footerHTML,
          headerHTML,
          roles: rolesId,
        },
      })
    })
  }
  await channel.close()
  await redisClient.disconnect()
}
