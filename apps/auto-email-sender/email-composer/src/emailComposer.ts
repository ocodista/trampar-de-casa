import { GetMessage } from 'amqplib'
import { Resend } from 'resend'
import { getMongoConnection, logger } from 'shared'
import { EmailQueues } from 'shared/src/enums/emailQueues'
import { MongoCollection } from 'shared/src/enums/mongo'
import { connectToQueue } from 'shared/src/queue/connectToQueue'
import { createRabbitMqConnection } from 'shared/src/queue/createRabbitMqConnection'
import { sendToQueue } from 'shared/src/queue/sendToQueue'
import { renderEmailWrapperHtml } from './createEmailHtml'
import { parsePreRenderMessage } from './parsePreRenderMessage'
import { renderRolesHtml } from './renderRolesSection'

export type EmailPreRenderMessage = Record<
  string,
  {
    footerHTML: string
    headerHTML: string
    roles: string[]
  }
>

export const composeEmail = async () => {
  const memoizedRoles = new Map()
  const rabbitConnection = await createRabbitMqConnection()
  const mongoConnection = await getMongoConnection()
  const mongoDatabase = mongoConnection.db('auto-email-sender')
  const mongoCollection = mongoDatabase.collection(
    MongoCollection.RolesRenderer
  )

  const [emailPreRendererChannel, emailSenderChannel] = await Promise.all([
    connectToQueue(rabbitConnection, EmailQueues.EmailPreRenderer),
    connectToQueue(rabbitConnection, EmailQueues.EmailSender),
  ])

  const renderedRolesHtml = renderRolesHtml()
  const renderedEmailWrapperHtml = renderEmailWrapperHtml()
  let msg: GetMessage | false,
    count = 0
  do {
    msg = await emailPreRendererChannel.get(EmailQueues.EmailPreRenderer, {
      noAck: false,
    })
    if (!msg) break
    const emailHtml = await parsePreRenderMessage(
      msg.content,
      mongoCollection,
      memoizedRoles,
      renderedRolesHtml,
      renderedEmailWrapperHtml
    )
    sendToQueue(EmailQueues.EmailSender, emailSenderChannel, emailHtml)
    emailPreRendererChannel.ack(msg)
    logger(++count)
  } while (msg)
  const resend = new Resend(process.env['RESEND_KEY'])
  await resend.emails.send({
    from: 'logger@trampardecasa.com.br',
    to: process.env['OWNER_EMAIL'] as string,
    subject: 'Trampar de casa emails were rendered!',
    text: `Rendering ${count} emails!`,
  })
  process.exit(0)
}
