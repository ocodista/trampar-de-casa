import { GetMessage } from 'amqplib'
import { Resend } from 'resend'
import { EmailQueues, logger } from 'shared'
import { createRabbitMqChannel } from 'shared/src/queue/createRabbitMqChannel'
import { CONFIG } from './config'
import { sendEmails } from './sendEmails'

const EMAIL_BATCH_SIZE = 50

export type EmailComposerContent = Record<
  string,
  { html: string; subject: string; subscriberId?: string }
>

export const emailSender = async () => {
  logger.time('emailSender')
  const resend = new Resend(CONFIG.RESEND_KEY)
  const channelToConsume = await createRabbitMqChannel()

  // Get initial queue size for progress tracking
  const initialQueueInfo = await channelToConsume.checkQueue(
    EmailQueues.EmailSender
  )
  const maxEmails = initialQueueInfo.messageCount
  console.log(
    `📧 Sending ${maxEmails} emails in batches of ${EMAIL_BATCH_SIZE}`
  )

  let count = 0,
    emailChunk: GetMessage[] = [],
    msg: GetMessage | false

  do {
    msg = await channelToConsume.get(EmailQueues.EmailSender)
    count++
    if (!msg) break
    if (count % EMAIL_BATCH_SIZE === 0) {
      const progress = maxEmails > 0 ? Math.round((count / maxEmails) * 100) : 0
      console.log(`📧 ${count}/${maxEmails} (${progress}%) - sending batch...`)
      await sendEmails(emailChunk, channelToConsume, resend)
      emailChunk = []
    }
    emailChunk.push(msg)
  } while (msg)

  if (emailChunk.length) {
    const finalProgress =
      maxEmails > 0 ? Math.round((count / maxEmails) * 100) : 100
    console.log(
      `📧 ${count}/${maxEmails} (${finalProgress}%) - sending final batch...`
    )
    await sendEmails(emailChunk, channelToConsume, resend)
    emailChunk = []
  }

  console.log(`🏁 📧 ${count}/${maxEmails} (100%) - All emails sent!`)
  await channelToConsume.purgeQueue(EmailQueues.EmailSender)
  logger.timeEnd('emailSender')
}
