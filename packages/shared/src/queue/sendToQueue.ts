import { Channel } from 'amqplib'
import { EmailQueues } from 'shared'

export async function sendToQueue<K>(
  queue: EmailQueues,
  queueChannel: Channel,
  props: K
) {
  queueChannel.sendToQueue(queue, Buffer.from(JSON.stringify(props)))
}
