import { Channel } from 'amqplib'
import { SupabaseTable } from 'db/src/supabase/utilityTypes'
import { EmailQueues } from 'shared'
import { sendToQueue } from './sendToQueue'

export type Subscriber = Pick<
  SupabaseTable<'Subscribers'>,
  'skillsId' | 'startedWorkingAt' | 'id' | 'email' | 'isConfirmed'
>
export const sendToSubsInfoEmailComposer = async (
  channel: Channel,
  props: Subscriber
) => {
  await sendToQueue(EmailQueues.SubsInfoEmailComposer, channel, props)
}
