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

  // Rate limiting configuration - interpret EMAIL_BATCH_SIZE as emails per second
  const rateLimit = CONFIG.EMAIL_BATCH_SIZE // emails per second

  let count = 0
  let batchNumber = 0
  let emailBatch: GetMessage[] = []
  let msg: GetMessage | false
  let lastBatchTime = Date.now()

  // Get queue size estimate for progress tracking
  const queueInfo = await channelToConsume.checkQueue(EmailQueues.EmailSender)
  const estimatedTotal = queueInfo.messageCount

  if (estimatedTotal > 0) {
    logger(
      `Processing ${estimatedTotal} emails at ${rateLimit} emails/second (batch size: ${rateLimit})`
    )
  }

  do {
    msg = await channelToConsume.get(EmailQueues.EmailSender)

    if (msg) {
      emailBatch.push(msg)

      // Process batch when we reach the rate limit
      if (emailBatch.length >= rateLimit) {
        batchNumber++
        const timeSinceLastBatch = Date.now() - lastBatchTime
        const waitTime = Math.max(0, 1000 - timeSinceLastBatch)

        // Wait if needed to respect rate limit
        if (waitTime > 0) {
          await new Promise((resolve) => setTimeout(resolve, waitTime))
        }

        const startTime = Date.now()
        await sendEmails(emailBatch, channelToConsume, sesClient)
        count += emailBatch.length
        const duration = Date.now() - startTime

        // Calculate progress
        const progress =
          estimatedTotal > 0 ? Math.min(100, (count / estimatedTotal) * 100) : 0
        const remaining = Math.max(0, estimatedTotal - count)

        logger(
          `Batch ${batchNumber}: ${progress.toFixed(
            1
          )}% (${count}/${estimatedTotal}) | Remaining: ${remaining} | ${duration}ms`
        )

        emailBatch = []
        lastBatchTime = Date.now()
      }
    }
  } while (msg)

  // Process remaining emails
  if (emailBatch.length > 0) {
    batchNumber++
    const timeSinceLastBatch = Date.now() - lastBatchTime
    const waitTime = Math.max(0, 1000 - timeSinceLastBatch)

    if (waitTime > 0) {
      await new Promise((resolve) => setTimeout(resolve, waitTime))
    }

    const startTime = Date.now()
    await sendEmails(emailBatch, channelToConsume, sesClient)
    count += emailBatch.length
    const duration = Date.now() - startTime

    const progress =
      estimatedTotal > 0 ? Math.min(100, (count / estimatedTotal) * 100) : 100
    logger(
      `Batch ${batchNumber}: ${progress.toFixed(
        1
      )}% (${count}/${estimatedTotal}) | Remaining: 0 | ${duration}ms`
    )
  }

  logger(
    `✓ Completed! Sent ${count} emails total at ${rateLimit} emails/second`
  )
  logger.timeEnd('emailSender')
  process.exit(0)
}
