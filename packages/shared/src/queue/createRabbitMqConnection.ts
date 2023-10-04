import amqplib from 'amqplib'
import dotenv from 'dotenv'
dotenv.config()

const RABBIT_ADDRESS = process.env['RABBITMQ_ADDRESS']

export async function createRabbitMqConnection({
  password,
  user,
}: {
  user: string
  password: string
}) {
  const connection = await amqplib.connect(
    `amqp://${user}:${password}@${RABBIT_ADDRESS}`
  )
  return connection
}
