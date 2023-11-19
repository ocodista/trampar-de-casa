import amqplib from 'amqplib'
import dotenv from 'dotenv'
dotenv.config()
export async function createRabbitMqChannel() {
  const RABBITMQ_ADDRESS = process.env['RABBITMQ_ADDRESS'] as string
  const connection = await amqplib.connect(RABBITMQ_ADDRESS)
  return await connection.createChannel()
}
