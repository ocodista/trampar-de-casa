import { Subscriber, Role } from 'db/src/types'

export interface EmailProps {
  email: string
  id: string
  rolesId: string[]
}

export const getEmailProps = (
  { email, id }: Subscriber,
  roles: Role[]
): EmailProps => {
  const emailProps = {
    email,
    id,
    rolesId: roles.map((role) => role.id),
  }

  return emailProps
}
