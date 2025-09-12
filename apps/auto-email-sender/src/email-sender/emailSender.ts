import { GetMessage } from 'amqplib'
import { SESClient } from '@aws-sdk/client-ses'
import { EmailQueues, logger } from 'shared'
import { createRabbitMqChannel } from 'shared/src/queue/createRabbitMqChannel'
import { CONFIG } from './config'
import { sendEmails } from './sendEmails'

export type EmailComposerContent = Record<
  string,
  { html: string; subject: string; subscriberId?: string }
>

export const emailSender = async () => {
  logger.time('emailSender')
  const sesClient = new SESClient({
    region: process.env.AWS_REGION || 'us-east-1',
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
  })
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
      await sendEmails(emailChunk, channelToConsume, sesClient)
      logger.timeEnd(`${count} emails sent!`)
      emailChunk = []
    }
    emailChunk.push(msg)
  } while (msg)

  if (emailChunk.length) {
    await sendEmails(emailChunk, channelToConsume, sesClient)
    logger(`sent [${count}] emails!`)
    emailChunk = []
  }

  logger.timeEnd('emailSender')
  process.exit(0)
}
