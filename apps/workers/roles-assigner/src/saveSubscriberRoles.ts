import { RedisClientType } from 'redis'
import { withExecutionTimeLogging } from 'shared/src/observability/withExecutionTimeLogging'
import { EmailProps } from './getEmailProps'

export const saveSubscriberRoles = withExecutionTimeLogging(
  async (redisClient: RedisClientType, emailProps: EmailProps) => {
    await redisClient.set(
      `subscriber:${emailProps.user.id}`,
      JSON.stringify(emailProps)
    )
  },
  { name: 'saveSubscriberRoles' }
)
