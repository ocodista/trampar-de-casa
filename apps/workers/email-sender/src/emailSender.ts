import { Resend } from 'resend'
import { EmailQueues } from 'shared'
import { connectToQueue } from 'shared/src/queue/connectToQueue'
import { CONFIG } from '../config'
import { consumeMessage } from './consumeMessage'

export const emailSender = async () => {
  const channelToConsume = await connectToQueue({
    password: CONFIG.RABBITMQ_PASS,
    user: CONFIG.RABBITMQ_USER,
  })
  channelToConsume.prefetch(1000)
  const resend = new Resend(CONFIG.RESEND_KEY)
  const queueConsumer = consumeMessage(channelToConsume, resend.emails)

  channelToConsume.consume(EmailQueues.EmailComposer, queueConsumer)
  return
}
