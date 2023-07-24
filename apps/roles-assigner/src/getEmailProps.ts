import { Roles, Subscribers } from 'db'

export interface EmailProps {
  user: {
    email: string
    id: string
  }
  roleIds: string[]
}

export const getEmailProps = (
  subscriber: Subscribers,
  roles: Roles[]
): EmailProps => ({
  user: {
    email: subscriber.email,
    id: subscriber.id,
  },
  roleIds: roles.map((role) => role.id),
})
