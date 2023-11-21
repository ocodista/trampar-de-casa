import { Connection } from 'amqplib'

export const connectToQueue = async (connection: Connection, queue: string) => {
  const channel = await connection.createChannel()
  await channel.assertQueue(queue)
  return channel
}
