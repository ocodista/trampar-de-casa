import amqplib from 'amqplib'
import dotenv from 'dotenv'
dotenv.config()
const RABBITMQ_ADDRESS = process.env['RABBITMQ_ADDRESS'] as string
export async function createRabbitMqChannel({
  password,
  user,
}: {
  user: string
  password: string
}) {
  const rabbitMqUrl = `amqp://${user}:${password}@${RABBITMQ_ADDRESS}`
  const connection = await amqplib.connect(rabbitMqUrl)
  return await connection.createChannel()
}
