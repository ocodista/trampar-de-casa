import amqplib from 'amqplib'

export async function createRabbitMqConnection({
  password,
  user,
}: {
  user: string
  password: string
}) {
  const connection = await amqplib.connect(
    `amqp://${user}:${password}@rabbitmq`
  )
  return connection
}
