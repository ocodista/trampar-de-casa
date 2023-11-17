import { Channel } from 'amqplib'
import { SupabaseTable } from 'db/src/supabase/utilityTypes'
import { sendToQueue } from './sendToQueue'
import { EmailQueues } from 'shared'

export type Subscriber = Pick<
  SupabaseTable<'Subscribers'>,
  'id' | 'email' | 'skillsId' | 'startedWorkingAt' | 'isConfirmed'
>
export const writeToQueues = async (
  subscribers: Subscriber[],
  channel: Channel
) => {
  const promises = subscribers.map(
    async ({ id, email, isConfirmed, skillsId, startedWorkingAt }) => {
      const emailComposerSub = {
        skillsId,
        startedWorkingAt,
        id,
        email,
        isConfirmed,
      }
      const emailPreRenderSub = {
        id,
        email,
      }
      return [
        sendToQueue(EmailQueues.EmailComposerSubs, channel, emailComposerSub),
        sendToQueue(EmailQueues.EmailPreRenderSubs, channel, emailPreRenderSub),
      ]
    }
  )
  await Promise.all(promises)
}
