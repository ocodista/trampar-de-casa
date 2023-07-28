import { RedisClientType } from 'redis'
import { RedisPrefix } from 'shared/src/enums/redis'
import { withExecutionTimeLogging } from 'shared/src/observability/withExecutionTimeLogging'
import { EmailProps } from './getEmailProps'

export const saveSubscriberRoles = withExecutionTimeLogging(
  async (redisClient: RedisClientType, emailProps: EmailProps) => {
    await redisClient.set(
      `${RedisPrefix.RolesAssigner}${emailProps.user.id}`,
      JSON.stringify(emailProps)
    )
  },
  { name: 'saveSubscriberRoles' }
)
