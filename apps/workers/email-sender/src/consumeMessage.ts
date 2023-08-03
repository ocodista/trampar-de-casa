import { Channel, ConsumeMessage } from 'amqplib'
import fs from 'node:fs'
import path from 'node:path'
import { Resend } from 'resend'

type EmailComposerContent = Record<string, string>

const logSuccessfully = (email: string) => {
  console.log(`Successfully sent to ${email}!`)
  fs.appendFileSync(
    path.resolve(__dirname, `./openings-email/sent-emails.txt`),
    `${email}\n`
  )
}

const logFailure = (email: string, error: unknown) => {
  console.error(`Error sending to: ${email}`, error)
  fs.appendFileSync(
    path.resolve(__dirname, `./openings-email/failed-emails.txt`),
    `${email}\n`
  )
}

export const consumeMessage =
  (currentChannel: Channel, emails: Resend['emails']) =>
  async (msg: ConsumeMessage | null) => {
    if (!msg) return
    const messageObject = JSON.parse(
      msg.content.toString()
    ) as EmailComposerContent
    const [email, html] = Object.entries(messageObject)[0]

    try {
      await emails.send({
        from: 'Trampar de Casa <comece@trampardecasa.com.br>',
        to: email,
        subject: 'Vagas para você Trampar de Casa',
        html,
      })
      logSuccessfully(email)
    } catch (error) {
      logFailure(email, error)
    }

    currentChannel.ack(msg)
  }
