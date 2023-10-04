import { Subscribers } from 'db'
import { withExecutionTimeLogging } from 'shared/src/observability/withExecutionTimeLogging'
import { Role } from './getSubscriberRoles'

export interface EmailProps {
  email: string
  id: string
  rolesId: string[]
}

export const getEmailProps = withExecutionTimeLogging(
  (subscriber: Subscribers, roles: Role[]): EmailProps => ({
    email: subscriber.email,
    id: subscriber.id,
    rolesId: roles.map((role) => role.id),
  }),
  { name: 'getEmailProps' }
)
