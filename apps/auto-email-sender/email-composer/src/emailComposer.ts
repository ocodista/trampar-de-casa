import { Channel, Connection, ConsumeMessage } from 'amqplib'
import { EmailQueues } from 'shared/src/enums/emailQueues'
import { createRabbitMqConnection } from 'shared/src/queue/createRabbitMqConnection'
import { CONFIG } from '../config'
import { parsePreRenderMessage } from './parsePreRenderMessage'

const rabbitMqCredentials = {
  password: CONFIG.RABBITMQ_PASS,
  user: CONFIG.RABBITMQ_USER,
}

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
  message: ConsumeMessage | null,
  emailComposerChannel: Channel
) => {
  if (!message) return

  const emailPreRender = JSON.parse(
    message.content.toString()
  ) as EmailPreRenderMessage
  const [email] = Object.keys(emailPreRender)
  const { roles } = emailPreRender[email]

  const emailHtml = await parsePreRenderMessage(message.content)
  emailComposerChannel.sendToQueue(
    EmailQueues.EmailSender,
    Buffer.from(JSON.stringify({ ...emailHtml, rolesCount: roles.length }))
  )
}

export const composeEmail = async () => {
  const rabbitConnection = await createRabbitMqConnection(rabbitMqCredentials)

  const [emailPreRendererChannel, emailSenderChannel] = await Promise.all([
    connectToQueue(rabbitConnection, EmailQueues.EmailPreRenderer),
    connectToQueue(rabbitConnection, EmailQueues.EmailSender),
  ])

  emailPreRendererChannel.consume(
    EmailQueues.EmailPreRenderer,
    (message) => consumePreRenderQueue(message, emailSenderChannel),
    { noAck: true }
  )
}
