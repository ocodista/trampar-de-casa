import { Resend } from 'resend'
import { EmailQueues } from 'shared'
import { connectToQueue } from 'shared/src/queue/connectToQueue'
import { CONFIG } from '../config'
import { EmailComposerContent, consumeMessage } from './consumeMessage'

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
  // channelToConsume.prefetch(1000)
  const resend = new Resend(CONFIG.RESEND_KEY)
  const emailComposerItems: EmailComposerContent[] = []
  const queueConsumer = consumeMessage(
    channelToConsume,
    resend.emails,
    (props) => emailComposerItems.push(props)
  )
  await channelToConsume.assertQueue(EmailQueues.EmailComposer)

  channelToConsume.consume(EmailQueues.EmailComposer, queueConsumer)

  const chunks = chunkArray(emailComposerItems, 10)
  for (const [index, chunk] of chunks.entries()) {
    const promises = chunk.map((emailComposerItem: EmailComposerContent) => {
      // const [email, html] = Objectentries(emailComposerItem)[0]
      console.log(emailComposerItem)
      // return sendEmail(resend.emails, email, html)
    })
    console.log(`\nWaiting for ${index + 1}/${chunks.length} chunk...`)
    await Promise.all(promises)
    console.log('\n\n')
  }

  return
}
