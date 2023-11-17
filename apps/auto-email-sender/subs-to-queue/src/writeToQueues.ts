import { Channel } from 'amqplib'
import { SupabaseTable } from 'db/src/supabase/utilityTypes'
import { EmailQueues } from 'shared'
import { sendToQueue } from './sendToQueue'

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
        sendToQueue(EmailQueues.RolesAssignerSubs, channel, emailComposerSub),
        sendToQueue(EmailQueues.EmailPreRenderSubs, channel, emailPreRenderSub),
      ]
    }
  )
  await Promise.all(promises)
}
