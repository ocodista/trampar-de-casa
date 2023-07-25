import { Roles, Subscribers } from 'db'
import { withExecutionTimeLogging } from 'shared/src/observability/withExecutionTimeLogging'

export interface EmailProps {
  user: {
    email: string
    id: string
  }
  roleIds: string[]
}

export const getEmailProps = withExecutionTimeLogging(
  (subscriber: Subscribers, roles: Roles[]): EmailProps => ({
    user: {
      email: subscriber.email,
      id: subscriber.id,
    },
    roleIds: roles.map((role) => role.id),
  }),
  { name: 'getEmailProps' }
)
