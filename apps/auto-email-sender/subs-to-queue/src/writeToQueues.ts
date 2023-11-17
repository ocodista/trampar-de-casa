import { Channel } from 'amqplib'
import { SupabaseTable } from 'db/src/supabase/utilityTypes'
import { sendToSubsInfoEmailComposer } from './sendToSubsInfoEmailComposer'
import { sendToSubsInfoEmailPreRenderer } from './sendToSubsInfoEmailPreRenderer'

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
      const subsInfoEmailComposerObject = {
        skillsId,
        startedWorkingAt,
        id,
        email,
        isConfirmed,
      }
      const subsInfoEmailPreRendererObject = {
        id,
        email,
      }
      return [
        sendToSubsInfoEmailComposer(channel, subsInfoEmailComposerObject),
        sendToSubsInfoEmailPreRenderer(channel, subsInfoEmailPreRendererObject),
      ]
    }
  )
  await Promise.all(promises)
}
