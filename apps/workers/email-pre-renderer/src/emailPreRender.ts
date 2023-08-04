import { Subscribers, getSupabaseClient } from 'db'
import { RedisClientType, createClient as createRedisClient } from 'redis'
import { Entities, createRabbitMqChannel } from 'shared'
import { RedisPrefix } from 'shared/src/enums/redis'
import { getAllPaginated } from 'shared/src/services/getAllPaginated'
import { CONFIG } from './config'
import { renderFooter } from './renderFooter'
import { renderHeader } from './renderHeader'
import { sendToQueue } from './sendToQueue'

export async function emailPreRender() {
  const redisClient = createRedisClient() as RedisClientType
  const channel = await createRabbitMqChannel({
    password: CONFIG.RABBITMQ_PASS,
    user: CONFIG.RABBITMQ_USER,
  })
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
      const promiseFooterHTML = new Promise<string>((resolve) =>
        resolve(renderFooter(id, CONFIG.URL_PREFIX))
      )
      const promiseHeaderHTML = new Promise<string>((resolve) =>
        resolve(renderHeader(rolesId))
      )
      const [footerHTML, headerHTML] = await Promise.all([
        promiseFooterHTML,
        promiseHeaderHTML,
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
