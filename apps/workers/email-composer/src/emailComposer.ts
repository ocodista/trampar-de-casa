import { ConsumeMessage } from 'amqplib'
import { EmailQueues } from 'shared/src/enums/emailQueues'
import { createRabbitMqChannel } from 'shared/src/queue/createRabbitMqChannel'
import { CONFIG } from '../config'
import { consumeMessage } from './consumeMessage'
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

  const messageConsumeHandler = consumeMessage(
    emailComposerChannel,
    emailPreRendererChannel
  )
  let emailPreRendererMessage = await emailPreRendererChannel.get(
    EmailQueues.EmailPreRenderer
  )
  do {
    if (!emailPreRendererMessage) break
    messageConsumeHandler(emailPreRendererMessage as unknown as ConsumeMessage)

    emailPreRendererMessage = await emailPreRendererChannel.get(
      EmailQueues.EmailPreRenderer
    )
  } while (emailPreRendererMessage)

  return
}
