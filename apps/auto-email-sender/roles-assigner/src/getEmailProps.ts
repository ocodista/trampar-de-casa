import { SupabaseTable } from 'db/src/supabase/utilityTypes'
import { withExecutionTimeLogging } from 'shared/src/observability/withExecutionTimeLogging'

type Subscribers = SupabaseTable<'Subscribers'>
type Role = SupabaseTable<'Roles'>
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
