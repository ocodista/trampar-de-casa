import { GetMessage } from 'amqplib'
import { Resend } from 'resend'
import { EmailQueues } from 'shared'
import { createRabbitMqChannel } from 'shared/src/queue/createRabbitMqChannel'
import { CONFIG } from '../config'
import { sendEmails } from './sendEmails'

export type EmailComposerContent = Record<
  string,
  { html: string; subject: string }
>

export const emailSender = async () => {
  console.time('emailSender')
  const resend = new Resend(CONFIG.RESEND_KEY)
  const channelToConsume = await createRabbitMqChannel({
    password: CONFIG.RABBITMQ_PASS,
    user: CONFIG.RABBITMQ_USER,
  })
  let count = 0,
    emailChunk: GetMessage[] = [],
    msg: GetMessage | false
  do {
    msg = await channelToConsume.get(EmailQueues.EmailSender)
    count++
    if (!msg) break
    if (count % 25 === 0) {
      await sendEmails(emailChunk, channelToConsume, resend)
      emailChunk = []
    }
    emailChunk.push(msg)
  } while (msg)

  if (emailChunk.length) {
    await sendEmails(emailChunk, channelToConsume, resend)
    emailChunk = []
  }

  console.timeEnd('emailSender')
  return
}
