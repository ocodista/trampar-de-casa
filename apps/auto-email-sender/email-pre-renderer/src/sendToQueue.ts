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
  const queue = EmailQueues.EmailPreRenderer
  await queueChannel.assertQueue(queue)
  console.log(props)
  queueChannel.sendToQueue(queue, Buffer.from(JSON.stringify(props)))
}
