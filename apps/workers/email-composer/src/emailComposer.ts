import { EmailQueues } from 'shared/src/enums/emailQueues'
import { createRabbitMqChannel } from 'shared/src/queue/createRabbitMqChannel'
import { CONFIG } from '../config'
import { consumeEmailPreRendererMessages } from './consumeEmailPreRendererMessages'

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

  const sendToEmailComposerQueue = (props: Record<string, string>) => {
    emailComposerChannel.sendToQueue(
      EmailQueues.EmailComposer,
      Buffer.from(JSON.stringify(props))
    )
  }
  emailPreRendererChannel.consume(
    EmailQueues.EmailPreRenderer,
    consumeEmailPreRendererMessages(sendToEmailComposerQueue),
    { noAck: true }
  )
}
