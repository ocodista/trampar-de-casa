import { Database } from 'db'
import { withExecutionTimeLogging } from 'shared/src/observability/withExecutionTimeLogging'

type Subscribers = Database['public']['Tables']['Subscribers']['Row']
type Role = Database['public']['Tables']['Roles']['Row']
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
