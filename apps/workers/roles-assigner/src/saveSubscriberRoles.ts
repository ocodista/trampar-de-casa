import { RedisClientType } from 'redis'
import { EmailProps } from './getEmailProps'

export const saveSubscriberRoles = async (
  redisClient: RedisClientType,
  emailProps: EmailProps
) => {
  await redisClient.set(
    `subscriber:${emailProps.user.id}`,
    JSON.stringify(emailProps)
  )
}
