import { openingsEmailHTML } from 'shared/src/email/openings-email/OpeningsEmail'
import { OpeningsEmail } from '../openings-email/Emails'
import { createUnsubscribeLink } from './createUnsubscribeLink'

export const emailHtml = async (
  secretKey: string,
  id: string,
  emailProps: OpeningsEmail
) => {
  const {
    openings: { localOpenings, globalOpenings },
  } = emailProps
  return await openingsEmailHTML({
    id,
    globalOpenings,
    localOpenings,
    feedbackFormUrl: emailProps.feedbackForm,
    unsubscribeUrl: createUnsubscribeLink(secretKey, id),
  })
}
