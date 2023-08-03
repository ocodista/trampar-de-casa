import { GetMessage } from 'amqplib'
import { Resend } from 'resend'
import { EmailQueues } from 'shared'
import { connectToQueue } from 'shared/src/queue/connectToQueue'
import { CONFIG } from '../config'
import { EmailComposerContent } from './consumeMessage'
import { sendEmail } from './sendEmail'

function chunkArray<T>(array: T[], size: number): T[][] {
  return Array.from({ length: Math.ceil(array.length / size) }, (_, index) =>
    array.slice(index * size, index * size + size)
  )
}

export const emailSender = async () => {
  const channelToConsume = await connectToQueue({
    password: CONFIG.RABBITMQ_PASS,
    user: CONFIG.RABBITMQ_USER,
  })
  console.log(sendEmail)
  // channelToConsume.prefetch(1000)
  const resend = new Resend(CONFIG.RESEND_KEY)
  const emailComposerItems: EmailComposerContent[] = []
  await channelToConsume.assertQueue(EmailQueues.EmailComposer, {
    durable: false,
  })

  let message = await channelToConsume.get(EmailQueues.EmailComposer)
  while (message) {
    if (!message) break
    const messageContent = JSON.parse(
      message.content.toString()
    ) as EmailComposerContent
    const [email] = Object.entries(messageContent)[0]
    console.log(`Received message: ${email}`)
    emailComposerItems.push(messageContent)
    message = await channelToConsume.get(EmailQueues.EmailComposer)
    if (message) {
      channelToConsume.ack(message as GetMessage)
    }
  }
  const chunks = chunkArray(emailComposerItems, 10)
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
