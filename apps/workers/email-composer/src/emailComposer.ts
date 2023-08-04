import { EmailQueues } from 'shared/src/enums/emailQueues'
import { createRabbitMqConnection } from 'shared/src/queue/createRabbitMqConnection'
import { CONFIG } from '../config'
import { Channel, Connection, ConsumeMessage, GetMessage } from 'amqplib'
import { getHtmlRoles } from './getHtmlRoles'

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

export const parsePreRenderMessage = async (
  msgContent: GetMessage['content']
): Promise<Record<string, string>> => {
  const emailPreRender = JSON.parse(
    msgContent.toString()
  ) as EmailPreRenderMessage
  const [email] = Object.keys(emailPreRender)
  const { footerHTML, headerHTML, roles } = emailPreRender[email]
  const rolesHTML = await getHtmlRoles(roles)
  const bodyHTML = `${headerHTML}${rolesHTML}${footerHTML}`
  return { [email]: bodyHTML }
}

export const consumePreRenderQueue = async (
  message: ConsumeMessage | null,
  emailComposerChannel: Channel
) => {
  if (!message) return
  const emailHtml = await parsePreRenderMessage(message.content)
  // There is no point in send to the EmailComposerQueue, we are already at the EmailComposer, need to change the name of the queue
  emailComposerChannel.sendToQueue(
    EmailQueues.EmailSender,
    Buffer.from(JSON.stringify(emailHtml))
  )
}

export const composeEmail = async () => {
  // TODO: Change name of the queue to be EmailSenderQueue
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
