import amqplib from 'amqplib'
import dotenv from 'dotenv'
dotenv.config()

const RABBIT_ADDRESS = process.env['RABBITMQ_ADDRESS'] as string

export async function createRabbitMqConnection() {
  const connection = await amqplib.connect(RABBIT_ADDRESS)
  return connection
}
