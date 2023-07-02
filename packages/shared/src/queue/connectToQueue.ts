import { connect } from 'amqplib';

export const connectToQueue = async (connectionString: string, queue: string) => {
  const connection = await connect(connectionString);
  const channel = await connection.createChannel();
  await channel.assertQueue(queue, { durable: false });
  return channel;
};