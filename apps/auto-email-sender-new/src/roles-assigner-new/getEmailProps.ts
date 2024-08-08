import { SupabaseTable } from 'db/src/supabase/utilityTypes'

type Subscribers = SupabaseTable<'Subscribers'>
type Role = SupabaseTable<'Roles'>
export interface EmailProps {
  email: string
  id: string
  rolesId: string[]
}

export const getEmailProps = (
  { email, id }: Subscribers,
  roles: Role[]
): EmailProps => {
  const emailProps = {
    email,
    id,
    rolesId: roles.map((role) => role.id),
  }

  return emailProps
}
