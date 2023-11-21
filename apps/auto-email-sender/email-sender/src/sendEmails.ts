import { Channel, GetMessage } from 'amqplib'
import { Resend } from 'resend'
import { EMAIL_FROM } from './baseEmail'
import { EmailComposerContent } from './emailSender'

const HARDCODED_SEND_LIST = [
  'santosjoao.dev@gmail.com',
  'caiohoborghi@gmail.com',
]

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

    const [email, { html, subject }] = Object.entries(content)[0]
    try {
      if (HARDCODED_SEND_LIST.includes(email)) {
        await resendCli.emails.send({
          from: EMAIL_FROM,
          to: email,
          html: html,
          subject,
        })
      }
      channel.ack(message)
    } catch (e) {
      console.error(e)
      channel.nack(message, false, true)
    }
  })
  await Promise.all(promises)
}
