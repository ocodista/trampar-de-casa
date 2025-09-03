import { GetMessage } from 'amqplib'
import dotenv from 'dotenv'
import {
  EmailQueues,
  MongoCollection,
  getMongoConnection,
  logger,
} from 'shared'
import { connectToQueue } from 'shared/src/queue/connectToQueue'
import { createRabbitMqConnection } from 'shared/src/queue/createRabbitMqConnection'
import { sendToQueue } from 'shared/src/queue/sendToQueue'
import { renderFooterHTML } from './renderFooter'
import { renderHeaderHtml } from './renderHeader'
import { renderHeaderAndFooter } from './renderHeaderAndFooter'
dotenv.config()

export const BATCH_SIZE = 1_000
export async function emailPreRender() {
  console.log(`🎨 W${process.pid}`)

  const mongoConnection = await getMongoConnection()
  const mongoDatabase = mongoConnection.db('auto-email-sender')
  const mongoCollection = mongoDatabase.collection(
    MongoCollection.RolesAssigner
  )
  const channel = await createRabbitMqConnection()
  const emailPreRendererChannel = await connectToQueue(
    channel,
    EmailQueues.EmailPreRenderer
  )
  const emailPreRenderSubsChannel = await connectToQueue(
    channel,
    EmailQueues.EmailPreRenderSubs
  )

  // Get initial queue size for progress tracking
  const initialQueueInfo = await emailPreRenderSubsChannel.checkQueue(
    EmailQueues.EmailPreRenderSubs
  )
  const maxMessages = initialQueueInfo.messageCount

  const renderedFooter = renderFooterHTML()
  const renderedHeader = renderHeaderHtml()

  let msg: GetMessage | false,
    count = 0,
    skippedCount = 0

  do {
    msg = await emailPreRenderSubsChannel.get(EmailQueues.EmailPreRenderSubs)
    if (!msg) break
    count = count + 1

    const { email, id: subscriberId } = JSON.parse(msg.content.toString()) as {
      id: string
      email: string
    }
    const subscriber = await mongoCollection.findOne({ id: subscriberId })

    if (!subscriber) {
      skippedCount += 1
      emailPreRenderSubsChannel.ack(msg)
      continue
    }

    const { rolesId } = subscriber as unknown as { rolesId: string[] }
    const { footerHTML, headerHTML } = await renderHeaderAndFooter(
      subscriberId,
      rolesId,
      renderedFooter,
      renderedHeader
    )

    await sendToQueue(EmailQueues.EmailPreRenderer, emailPreRendererChannel, {
      [email]: {
        footerHTML,
        headerHTML,
        roles: rolesId,
      },
    })
    emailPreRenderSubsChannel.ack(msg)

    // Show progress every 25 emails
    if (count % 25 === 0) {
      const progress =
        maxMessages > 0 ? Math.round((count / maxMessages) * 100) : 0
      const successPct =
        count > 0 ? Math.round(((count - skippedCount) / count) * 100) : 0
      const skippedPct =
        count > 0 ? Math.round((skippedCount / count) * 100) : 0
      console.log(
        `W${process.pid}: ${count}/${maxMessages} (${progress}%) | OK: ${
          count - skippedCount
        } (${successPct}%) | Skip: ${skippedCount} (${skippedPct}%)`
      )
    }
  } while (msg)

  const finalProgress =
    maxMessages > 0 ? Math.round((count / maxMessages) * 100) : 100
  const successPct =
    count > 0 ? Math.round(((count - skippedCount) / count) * 100) : 0
  const skippedPct = count > 0 ? Math.round((skippedCount / count) * 100) : 0
  console.log(
    `🏁 W${process.pid}: ${count}/${maxMessages} (${finalProgress}%) | OK: ${
      count - skippedCount
    } (${successPct}%) | Skip: ${skippedCount} (${skippedPct}%)`
  )
  await mongoConnection.close()

  return {
    processedCount: count,
    skippedCount,
    processId: process.pid,
  }
}
