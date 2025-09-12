import { Channel, GetMessage } from 'amqplib'
import { SESClient, SendRawEmailCommand } from '@aws-sdk/client-ses'
import { logger } from 'shared'
import { EMAIL_FROM } from './baseEmail'
import { EmailComposerContent } from './index'
import { getUnsubscribeLink } from '../email-pre-render/getUnsubscribeLink'

export const sendEmails = async (
  buffers: GetMessage[],
  channel: Channel,
  sesClient: SESClient
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
      // Build raw email with proper headers including unsubscribe
      const rawEmailParts = [
        `From: ${EMAIL_FROM}`,
        `To: ${email}`,
        `Subject: ${subject}`,
        `MIME-Version: 1.0`,
        `Content-Type: text/html; charset=UTF-8`,
      ]

      // Add unsubscribe headers if we have an unsubscribe URL
      if (unsubscribeUrl) {
        rawEmailParts.push(`List-Unsubscribe: <${unsubscribeUrl}>`)
        rawEmailParts.push(`List-Unsubscribe-Post: List-Unsubscribe=One-Click`)
      }

      rawEmailParts.push('', html) // Empty line before body

      const rawEmail = rawEmailParts.join('\r\n')

      const sendEmailCommand = new SendRawEmailCommand({
        RawMessage: {
          Data: Buffer.from(rawEmail),
        },
        Tags: [
          {
            Name: 'EmailType',
            Value: 'job-notification',
          },
          {
            Name: 'Environment',
            Value: process.env.NODE_ENV || 'production',
          },
          ...(subscriberId
            ? [
                {
                  Name: 'HasSubscriber',
                  Value: 'true',
                },
              ]
            : [
                {
                  Name: 'HasSubscriber',
                  Value: 'false',
                },
              ]),
        ],
      })

      await sesClient.send(sendEmailCommand)
      channel.ack(message)
    } catch (e) {
      logger.error(e)
      channel.nack(message, false, true)
    }
  })
  await Promise.all(promises)
}
