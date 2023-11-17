import { Channel, Connection, GetMessage } from 'amqplib'
import { EmailQueues } from 'shared/src/enums/emailQueues'
import { createRabbitMqConnection } from 'shared/src/queue/createRabbitMqConnection'
import { parsePreRenderMessage } from './parsePreRenderMessage'

const connectToQueue = async (connection: Connection, queue: string) => {
  const channel = await connection.createChannel()
  await channel.assertQueue(queue)
  return channel
}

export type EmailPreRenderMessage = Record<
  string,
  {
    footerHTML: string
    headerHTML: string
    roles: string[]
  }
>

export const consumePreRenderQueue = async (
  message: GetMessage | false,
  emailComposerChannel: Channel
) => {
  if (!message) return
  const emailHtml = await parsePreRenderMessage(message.content)
  emailComposerChannel.sendToQueue(
    EmailQueues.EmailSender,
    Buffer.from(JSON.stringify(emailHtml))
  )
}

export const composeEmail = async () => {
  console.time('composeEmail')
  const rabbitConnection = await createRabbitMqConnection()

  const [emailPreRendererChannel, emailSenderChannel] = await Promise.all([
    connectToQueue(rabbitConnection, EmailQueues.EmailPreRenderer),
    connectToQueue(rabbitConnection, EmailQueues.EmailSender),
  ])

  let msg: GetMessage | false,
    count = 0
  do {
    msg = await emailPreRendererChannel.get(EmailQueues.EmailPreRenderer, {
      noAck: false,
    })
    await consumePreRenderQueue(msg, emailSenderChannel)
    if (msg) {
      emailPreRendererChannel.ack(msg)
    }
    console.log(++count)
  } while (msg)

  console.timeEnd('composeEmail')
  process.exit(0)
}
