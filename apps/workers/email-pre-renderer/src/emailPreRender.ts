import { RedisClientType, createClient as createRedisClient } from 'redis'
import { createRabbitMqChannel } from 'shared'
import { RedisPrefix } from 'shared/src/enums/redis'
import { CONFIG } from './config'
import { getAllSubscribers } from './getAllSubscribers'
import { renderFooter } from './renderFooter'
import { renderHeader } from './renderHeader'
import { sendToQueue } from './sendToQueue'

export async function emailPreRender() {
  const redisClient = createRedisClient() as RedisClientType
  await redisClient.connect()
  const channel = await createRabbitMqChannel({
    password: CONFIG.RABBITMQ_PASS,
    user: CONFIG.RABBITMQ_USER,
  })

  const subscriberRolesAndEmail: {
    rolesId: string[]
    email: string
    id: string
  }[] = []
  const data = await getAllSubscribers()
  if (!data) return
  for (const { email, id } of data) {
    const subscriber = await redisClient.get(
      `${RedisPrefix.RolesAssigner}${id}`
    )
    if (!subscriber) return
    const rolesAssignerInfos = JSON.parse(subscriber) as { rolesId: string[] }
    subscriberRolesAndEmail.push({ ...rolesAssignerInfos, email, id })
  }
  subscriberRolesAndEmail.forEach(async ({ email, rolesId, id }) => {
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

  await channel.close()
  await redisClient.disconnect()
}
