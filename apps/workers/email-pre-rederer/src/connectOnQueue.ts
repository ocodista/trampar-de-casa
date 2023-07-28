import amqplib from 'amqplib'
import { CONFIG } from './config'

// ? This function is a black box?
export async function connectToQueue() {
  const { RABBITMQ_PASS, RABBITMQ_USER } = CONFIG
  const connection = await amqplib.connect(
    `amqp://${RABBITMQ_USER}:${RABBITMQ_PASS}@localhost`
  )
  return await connection.createChannel()
}
