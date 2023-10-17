import { EmailQueues } from 'shared'
import { createRabbitMqChannel } from 'shared/src/queue/createRabbitMqChannel'
import { CONFIG } from '../config'
import { saveOnEmailChunk } from './saveOnEmailChunk'

export type EmailComposerContent = Record<string, string>

export const emailSender = async () => {
  const channelToConsume = await createRabbitMqChannel({
    password: CONFIG.RABBITMQ_PASS,
    user: CONFIG.RABBITMQ_USER,
  })

  await channelToConsume.prefetch(25)
  await channelToConsume.consume(
    EmailQueues.EmailSender,
    async (msg) => {
      if (!msg) return

      await saveOnEmailChunk(msg, channelToConsume)
    },
    { noAck: false }
  )

  return
}
