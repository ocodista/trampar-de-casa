import { GetMessage } from 'amqplib'
import dotenv from 'dotenv'
import { EmailQueues, MongoCollection, getMongoConnection } from 'shared'
import { createRabbitMqChannel } from 'shared/src/queue/createRabbitMqChannel'
import { sendToQueue } from 'shared/src/queue/sendToQueue'
import { renderHeaderAndFooter } from './renderHeaderAndFooter'
dotenv.config()

export const BATCH_SIZE = 1_000
export async function emailPreRender() {
  const mongoConnection = await getMongoConnection()
  const mongoDatabase = mongoConnection.db('auto-email-sender')
  const mongoCollection = mongoDatabase.collection(
    MongoCollection.RolesAssigner
  )
  const channel = await createRabbitMqChannel()
  channel.assertQueue(EmailQueues.EmailPreRenderer)
  let msg: GetMessage | false,
    count = 0

  do {
    msg = await channel.get(EmailQueues.EmailPreRenderSubs)
    if (!msg) break
    count = count + 1
    const logText = `Processed: ${count}`
    console.time(logText)
    const { email, id } = JSON.parse(msg.content.toString()) as {
      id: string
      email: string
    }
    const subscriber = await mongoCollection.findOne({ id })
    if (!subscriber) continue
    const { rolesId } = subscriber as unknown as { rolesId: string[] }
    const { footerHTML, headerHTML } = await renderHeaderAndFooter(id, rolesId)

    await sendToQueue(EmailQueues.EmailPreRenderer, channel, {
      [email]: {
        footerHTML,
        headerHTML,
        roles: rolesId,
      },
    })
    channel.ack(msg)
    console.timeEnd(logText)
  } while (msg)

  await mongoConnection.close()
  process.exit(0)
}
