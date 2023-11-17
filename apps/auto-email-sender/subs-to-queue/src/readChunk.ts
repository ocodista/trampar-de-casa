import { Channel } from 'amqplib'
import { SupabaseTable } from 'db/src/supabase/utilityTypes'
import { sendToSubsInfoEmailComposer } from './sendToSubsInfoEmailComposer'
import { sendToSubsInfoEmailPreRenderer } from './sendToSubsInfoEmailPreRenderer'

export type Subscriber = Pick<
  SupabaseTable<'Subscribers'>,
  'id' | 'email' | 'skillsId' | 'startedWorkingAt' | 'isConfirmed'
>
export const readChunk = async (
  subscribers: Subscriber[],
  channel: Channel
) => {
  for (const {
    skillsId,
    startedWorkingAt,
    id,
    email,
    isConfirmed,
  } of subscribers) {
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
    await Promise.all([
      sendToSubsInfoEmailComposer(channel, subsInfoEmailComposerObject),
      sendToSubsInfoEmailPreRenderer(channel, subsInfoEmailPreRendererObject),
    ])
  }
}
