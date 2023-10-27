import { Channel, GetMessage } from 'amqplib'
import { Resend } from 'resend'
import { EMAIL_FROM, rolesSubject } from './baseEmail'
import { EmailComposerContent } from './emailSender'

export const sendEmails = async (
  buffers: GetMessage[],
  channel: Channel,
  resendCli: Resend
) => {
  const id = Date.now()
  console.time(`sendEmails#${id}`)
  const promises = buffers.map(async (message) => {
    const content = JSON.parse(
      message.content.toString()
    ) as EmailComposerContent

    const [email, html] = Object.entries(content)[0]
    try {
      await resendCli.emails.send({
        from: EMAIL_FROM,
        to: email,
        html: html,
        subject: rolesSubject(30),
      })
      channel.ack(message)
    } catch (e) {
      console.error(e)
      channel.nack(message, false, true)
    }
  })
  await Promise.all(promises)
  console.timeEnd(`sendEmails#${id}`)
}
