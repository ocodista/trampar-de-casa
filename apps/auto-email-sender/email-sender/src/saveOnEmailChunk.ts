import { Channel, ConsumeMessage } from 'amqplib'
import { Resend } from 'resend'
import { withExecutionTimeLogging } from 'shared/src/observability/withExecutionTimeLogging'
import { CONFIG } from '../config'
import { EmailComposerContent } from './emailSender'
import { sendEmail } from './sendEmail'

let currentEmailChunk: ConsumeMessage[] = []
const resend = new Resend(CONFIG.RESEND_KEY)
const RESEND_SENDING_LIMIT = 25

export const sendEmailChunk = withExecutionTimeLogging(
  async (buffers: ConsumeMessage[], channel: Channel) => {
    const promises = buffers.map(async (message) => {
      const content = JSON.parse(
        message.content.toString()
      ) as EmailComposerContent

      const [email, html] = Object.entries(content)[0]
      try {
        await sendEmail(resend.emails, email, html)
        channel.ack(message)
      } catch {
        channel.nack(message, false, true)
      }
    })
    await Promise.all(promises)
  },
  { name: 'sendEmailChunks' }
)

export const saveOnEmailChunk = async (
  emailComposerMessage: ConsumeMessage,
  channel: Channel
) => {
  currentEmailChunk.push(emailComposerMessage)

  if (currentEmailChunk.length === RESEND_SENDING_LIMIT) {
    await sendEmailChunk(currentEmailChunk, channel)

    currentEmailChunk = []
  }
}
