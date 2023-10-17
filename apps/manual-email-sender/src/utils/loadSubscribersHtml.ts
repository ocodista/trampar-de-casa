import { Subscribers } from 'db'
import { OpeningsEmail } from '../openings-email/Emails'
import { emailHtml } from './emailHtml'

export const loadSubscribersHtml = async (
  secretKey: string,
  subscribers: Subscribers[],
  emailProps: OpeningsEmail
) => {
  const emailsHTML: Record<string, string> = {}
  for (const subscriber of subscribers) {
    emailsHTML[subscriber.id] = await emailHtml(
      secretKey,
      subscriber.id,
      emailProps
    )
  }
  return emailsHTML
}
