import { ConsumeMessage } from 'amqplib'
import { EmailQueues } from 'shared/src/enums/emailQueues'
import { connectToQueue } from 'shared/src/queue/connectToQueue'
import { CONFIG } from '../config'
import { consumeMessage } from './consumeMessage'

export const emailComposer = async () => {
  const channelToConsume = await connectToQueue({
    password: CONFIG.RABBITMQ_PASS,
    user: CONFIG.RABBITMQ_USER,
  })
  const channelToSend = await connectToQueue({
    password: CONFIG.RABBITMQ_PASS,
    user: CONFIG.RABBITMQ_USER,
  })
  await Promise.all([
    channelToConsume.assertQueue(EmailQueues.EmailPreRenderer),
    channelToSend.assertQueue(EmailQueues.EmailComposer, { durable: false }),
  ])

  const messageConsumeHandler = consumeMessage(channelToSend, channelToConsume)
  let message = await channelToConsume.get(EmailQueues.EmailPreRenderer)
  while (message) {
    if (!message) break
    messageConsumeHandler(message as unknown as ConsumeMessage)

    message = await channelToConsume.get(EmailQueues.EmailPreRenderer)
  }

  // await channelToConsume.consume(
  //   EmailQueues.EmailPreRenderer,
  //   messageConsumeHandler
  // )

  return
}
