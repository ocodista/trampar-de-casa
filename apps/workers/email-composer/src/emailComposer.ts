import { Message } from 'amqplib'
import { EmailQueues } from 'shared/src/enums/emailQueues'
import { createRabbitMqChannel } from 'shared/src/queue/createRabbitMqChannel'
import { CONFIG } from '../config'
import { ConsumeMessageReturn, consumeMessage } from './consumeMessage'
import { getHtmlRoles } from './getHtmlRoles'

const rabbitMqCredentials = {
  password: CONFIG.RABBITMQ_PASS,
  user: CONFIG.RABBITMQ_USER,
}

export const emailComposer = async () => {
  const emailPreRendererChannel = await createRabbitMqChannel(
    rabbitMqCredentials
  )
  const emailComposerChannel = await createRabbitMqChannel(rabbitMqCredentials)

  await Promise.all([
    emailPreRendererChannel.assertQueue(EmailQueues.EmailPreRenderer),
    emailComposerChannel.assertQueue(EmailQueues.EmailComposer, {
      durable: false,
    }),
  ])

  const sendToEmailComposerQueue = async (props: Record<string, string>) => {
    emailComposerChannel.sendToQueue(
      EmailQueues.EmailComposer,
      Buffer.from(JSON.stringify(props))
    )
  }

  let emailPreRendererMessage = await emailPreRendererChannel.get(
    EmailQueues.EmailPreRenderer
  )
  do {
    const sanitizedMessage = await consumeMessage(emailPreRendererMessage)
    if (!sanitizedMessage) break
    const { email, footerHTML, headerHTML, roles } =
      sanitizedMessage as ConsumeMessageReturn
    const rolesHTML = await getHtmlRoles(roles)

    sendToEmailComposerQueue({
      [email]: `${headerHTML}${rolesHTML}${footerHTML}`,
    })
    emailPreRendererChannel.ack(emailPreRendererMessage as Message)

    emailPreRendererMessage = await emailPreRendererChannel.get(
      EmailQueues.EmailPreRenderer
    )
  } while (emailPreRendererMessage)

  return
}
