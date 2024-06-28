import { GetMessage } from 'amqplib'
import { Resend } from 'resend'
import { EmailQueues, logger } from 'shared'
import { createRabbitMqChannel } from 'shared/src/queue/createRabbitMqChannel'
import { CONFIG } from './config'
import { sendEmails } from './sendEmails'

export type EmailComposerContent = Record<
  string,
  { html: string; subject: string }
>

export const emailSender = async () => {
  logger.time('emailSender')
  const resend = new Resend(CONFIG.RESEND_KEY)
  const channelToConsume = await createRabbitMqChannel()
  let count = 0,
    emailChunk: GetMessage[] = [],
    msg: GetMessage | false

  do {
    msg = await channelToConsume.get(EmailQueues.EmailSender)
    count++
    if (!msg) break
    if (count % 25 === 0) {
      logger.time(`${count} emails sent!`)
      await sendEmails(emailChunk, channelToConsume, resend)
      logger.timeEnd(`${count} emails sent!`)
      emailChunk = []
    }
    emailChunk.push(msg)
  } while (msg)

  if (emailChunk.length) {
    await sendEmails(emailChunk, channelToConsume, resend)
    logger(`sent [${count}] emails!`)
    emailChunk = []
  }
  await channelToConsume.purgeQueue(EmailQueues.EmailSender)
  logger.timeEnd('emailSender')
}
