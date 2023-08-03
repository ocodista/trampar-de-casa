import { Channel, ConsumeMessage } from 'amqplib'
import { Resend } from 'resend'
import { sendEmail } from './sendEmail'

export type EmailComposerContent = Record<string, string>

export const consumeMessage =
  (
    currentChannel: Channel,
    emails: Resend['emails'],
    cb: (props: EmailComposerContent) => void
  ) =>
  async (msg: ConsumeMessage | null) => {
    if (!msg) return
    const messageObject = JSON.parse(
      msg.content.toString()
    ) as EmailComposerContent
    cb(messageObject)
    const [email, html] = Object.entries(messageObject)[0]
    await sendEmail(emails, email, html)
    currentChannel.ack(msg)
  }
