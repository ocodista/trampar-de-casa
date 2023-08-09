import { GetMessage } from 'amqplib'
import { Resend } from 'resend'
import { EmailQueues } from 'shared'
import { createRabbitMqChannel } from 'shared/src/queue/createRabbitMqChannel'
import { CONFIG } from '../config'
import { chunkArray } from './chunkArray'
import { sendEmail } from './sendEmail'

export type EmailComposerContent = Record<string, string>

export const emailSender = async () => {
  const channelToConsume = await createRabbitMqChannel({
    password: CONFIG.RABBITMQ_PASS,
    user: CONFIG.RABBITMQ_USER,
  })
  const resend = new Resend(CONFIG.RESEND_KEY)
  const emailComposerItems: EmailComposerContent[] = []
  await channelToConsume.assertQueue(EmailQueues.EmailSender, {
    durable: true,
  })

  // TODO: update consume approach
  let message = await channelToConsume.get(EmailQueues.EmailSender)
  while (message) {
    if (!message) break
    const messageContent = JSON.parse(
      message.content.toString()
    ) as EmailComposerContent
    emailComposerItems.push(messageContent)
    if (message) {
      channelToConsume.ack(message as GetMessage)
    }
    message = await channelToConsume.get(EmailQueues.EmailSender)
  }

  const chunks = chunkArray(emailComposerItems, 25)
  for (const [index, chunk] of chunks.entries()) {
    const promises = chunk.map(
      async (emailComposerItem: EmailComposerContent) => {
        const [email, html] = Object.entries(emailComposerItem)[0]
        return await sendEmail(resend.emails, email, html)
      }
    )
    console.log(`\nWaiting for ${index + 1}/${chunks.length} chunk...`)
    await Promise.all(promises)
    console.log('\n\n')
  }

  return
}
