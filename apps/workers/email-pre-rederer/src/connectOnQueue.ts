import amqplib from 'amqplib'

// ? This function is a black box?
export async function connectToQueue() {
  const connection = await amqplib.connect('amqp://username:password@localhost')
  return await connection.createChannel()
}
