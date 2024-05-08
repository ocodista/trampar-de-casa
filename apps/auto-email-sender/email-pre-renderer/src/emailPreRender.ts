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
  const renderedFooter = renderFooterHTML()
  const renderedHeader = renderHeaderHtml()

  let msg: GetMessage | false,
    count = 0

  do {
    msg = await emailPreRenderSubsChannel.get(EmailQueues.EmailPreRenderSubs)
    if (!msg) break
    count = count + 1
    const logText = `Processed: ${count}`
    logger.time(logText)
    const { email, id: subscriberId } = JSON.parse(msg.content.toString()) as {
      id: string
      email: string
    }
    const subscriber = await mongoCollection.findOne({ id: subscriberId })
    if (!subscriber) continue
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
    logger.timeEnd(logText)
  } while (msg)

  await mongoConnection.close()
  process.exit(0)
}
