import { Channel } from 'amqplib'
import { EmailQueues } from 'shared'

type Props = Record<
  string,
  {
    footerHTML: string
    headerHTML: string
    roles: string[]
  }
>
export async function sendToQueue(queueChannel: Channel, props: Props) {
  console.time(`sendToQueue#${Object.entries(props)[0][0]}`)
  const queue = EmailQueues.EmailPreRenderer
  await queueChannel.assertQueue(queue)
  queueChannel.sendToQueue(queue, Buffer.from(JSON.stringify(props)))
  console.timeEnd(`sendToQueue#${Object.entries(props)[0][0]}`)
}
