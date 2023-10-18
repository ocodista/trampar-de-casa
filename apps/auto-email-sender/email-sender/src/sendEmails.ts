import { Channel, GetMessage } from 'amqplib'
import { Resend } from 'resend'
import { withExecutionTimeLogging } from 'shared/src/observability/withExecutionTimeLogging'
import { EMAIL_FROM, rolesSubject } from './baseEmail'
import { EmailComposerContent } from './emailSender'

export const sendEmails = withExecutionTimeLogging(
  async (buffers: GetMessage[], channel: Channel, resendCli: Resend) => {
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
          subject: rolesSubject(38),
        })
        channel.ack(message)
      } catch (e) {
        console.error(e)
        channel.nack(message, false, true)
      }
    })
    await Promise.all(promises)
  },
  { name: 'sendEmailChunks' }
)
