import { ChannelModel } from 'amqplib'

export const connectToQueue = async (
  connection: ChannelModel,
  queue: string
) => {
  const channel = await connection.createChannel()
  await channel.assertQueue(queue)
  return channel
}
