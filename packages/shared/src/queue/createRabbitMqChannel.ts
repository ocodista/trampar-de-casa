import amqplib from 'amqplib'

// ? This function is a black box?
export async function createRabbitMqChannel({
  password,
  user,
}: {
  user: string
  password: string
}) {
  const connection = await amqplib.connect(
    `amqp://${user}:${password}@localhost`
  )
  return await connection.createChannel()
}
