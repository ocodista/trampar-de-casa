import { RedisClientType } from 'redis'
import { openingsEmailHTML } from 'shared/src/email/openings-email/OpeningsEmail'
import { OpeningsEmail } from '../openings-email/Emails'
import { createUnsubscribeLink } from './createUnsubscribeLink'

export const emailHtml = async (
  redis: RedisClientType,
  secretKey: string,
  id: string,
  emailProps: OpeningsEmail
) => {
  const {
    openings: { localOpenings, globalOpenings },
  } = emailProps
  return await openingsEmailHTML({
    redis,
    id,
    globalOpenings,
    localOpenings,
    feedbackFormUrl: emailProps.feedbackForm,
    unsubscribeUrl: createUnsubscribeLink(secretKey, id),
  })
}
