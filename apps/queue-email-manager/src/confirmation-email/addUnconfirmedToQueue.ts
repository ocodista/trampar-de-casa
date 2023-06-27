import { readFileSync } from 'fs';
import { createClient } from '@supabase/supabase-js';
import { Channel } from 'amqplib';
import path from "path"
import dotenv from "dotenv"
import { Entities } from 'shared';
import { EmailQueues } from 'shared/src/enums';
import { connectToQueue } from 'shared/src/queue';

dotenv.config()

const SUPABASE_URL = process.env.SUPABASE_URL || ''
const SUPABASE_KEY = process.env.SUPABASE_KEY || ''
const RABBITMQ_URL = process.env.RABBIT_CONNECTION_STRING || ''
const WAIT_SECONDS = 1

const getConfirmedSubscribers = async () => {
  const supabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY)
  const { data, error } = await supabaseClient.from(Entities.Subcribers).select('*').eq('isConfirmed', 'FALSE')
  if (error) 
    throw error;
  return data
}

async function getUnconfirmedNotSentSubscribers(emailsSent: string[]) {
  const confirmedSubscribers = await getConfirmedSubscribers();
  return confirmedSubscribers.filter((subscriber) => !emailsSent.includes(subscriber.email));
}

async function insertRowsIntoQueue(channel: Channel, rows: { email: string, id: string }[]) {
  let i = 1;
  for (const row of rows) {
    const obj = { email: row.email, id: row.id };
    channel.sendToQueue(EmailQueues.ConfirmationEmail, Buffer.from(JSON.stringify(obj)));
    console.log(`[${i++} / ${rows.length}] Add ${row.email} to queue!`);
    console.log(`Waiting ${WAIT_SECONDS}s...`);
    await new Promise(r => setTimeout(r, WAIT_SECONDS * 1_000));
  }
}

async function main() {
  const successEmailsPath = path.resolve(__dirname, './success-emails.txt');
  const emailsSent = readFileSync(successEmailsPath, 'utf8').split("\n");
  const channel = await connectToQueue(RABBITMQ_URL, EmailQueues.ConfirmationEmail);
  const notSentRows = await getUnconfirmedNotSentSubscribers(emailsSent);
  await insertRowsIntoQueue(channel, notSentRows);

  console.log(`Sent ${notSentRows.length} messages to RabbitMQ`);
}

main().catch(console.error);


