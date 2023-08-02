import { Subscribers } from 'db'
import { RedisClientType, createClient as redisCreateClient } from 'redis'
import { OpeningsEmail } from '../openings-email/Emails'
import { emailHtml } from './emailHtml'

export const loadSubscribersHtml = async (
  secretKey: string,
  subscribers: Subscribers[],
  emailProps: OpeningsEmail
) => {
  const client = redisCreateClient() as RedisClientType
  await client.connect()

  const emailsHTML: Record<string, string> = {}
  console.time('load htmls')
  let count = 0
  for (const subscriber of subscribers) {
    count++
    emailsHTML[subscriber.id] = await emailHtml(
      client,
      secretKey,
      subscriber.id,
      emailProps
    )
  }
  console.timeEnd('load htmls')

  await client.disconnect()
  return { emailsHTML, count }
}
