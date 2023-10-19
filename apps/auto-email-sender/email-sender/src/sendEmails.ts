import { Channel, GetMessage } from 'amqplib'
import fs from 'fs'
import path from 'path'
import { Resend } from 'resend'
import { EmailComposerContent } from './emailSender'

export const sendEmails = async (
  buffers: GetMessage[],
  channel: Channel,
  resendCli: Resend
) => {
  console.time('sendEmails')
  const promises = buffers.map(async (message) => {
    const content = JSON.parse(
      message.content.toString()
    ) as EmailComposerContent

    const [email, html] = Object.entries(content)[0]
    try {
      await new Promise((r) => setTimeout(r, 1000))
      // await resendCli.emails.send({
      //   from: EMAIL_FROM,
      //   to: email,
      //   html: html,
      //   subject: rolesSubject(38),
      // })
      fs.appendFileSync(
        path.resolve(__dirname, `./openings-email/sent-emails.txt`),
        `${email}\n`
      )
      channel.ack(message)
    } catch (e) {
      console.error(e)
      channel.nack(message, false, true)
    }
  })
  await Promise.all(promises)
  console.time('sendEmails')
}
