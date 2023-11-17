import { Channel } from 'amqplib'
import { SupabaseTable } from 'db/src/supabase/utilityTypes'
import { EmailQueues } from 'shared'
import { sendToQueue } from './sendToQueue'

export type Subscriber = Pick<SupabaseTable<'Subscribers'>, 'id' | 'email'>
export const sendToSubsInfoEmailPreRenderer = async (
  channel: Channel,
  subscriber: Subscriber
) => {
  await sendToQueue(EmailQueues.SubsInfoEmailPreRenderer, channel, subscriber)
}
