import { Channel, GetMessage } from 'amqplib'
import { Resend } from 'resend'
import { logger } from 'shared'
import { EMAIL_FROM } from './baseEmail'
import { EmailComposerContent } from './emailSender'
import { getUnsubscribeLink } from '../email-pre-render/getUnsubscribeLink'

export const sendEmails = async (
  buffers: GetMessage[],
  channel: Channel,
  resendCli: Resend
) => {
  const promises = buffers.map(async (message) => {
    // TODO: Remove parsing, save as string on rabbit
    const content = JSON.parse(
      message.content.toString()
    ) as EmailComposerContent

    const [email, { html, subject, subscriberId }] = Object.entries(content)[0]

    // Generate unsubscribe link using the same logic
    const urlPrefix = process.env['URL_PREFIX'] || ''
    const unsubscribeUrl = subscriberId
      ? getUnsubscribeLink(urlPrefix, subscriberId)
      : undefined

    try {
      await resendCli.emails.send({
        from: EMAIL_FROM,
        to: email,
        html: html,
        subject,
        headers: unsubscribeUrl
          ? {
              'List-Unsubscribe': `<${unsubscribeUrl}>`,
              'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click',
            }
          : undefined,
      })
      channel.ack(message)
    } catch (e) {
      logger.error(e)
      channel.nack(message, false, true)
    }
  })
  await Promise.all(promises)
}
