import { getSupabaseClient } from 'db'
import { getAllConfirmedSubscribersPaginated } from 'db/src/supabase/domains/subscribers/getAllConfirmedSubscribersPaginated'
import { createRabbitMqChannel } from 'shared'
import { readChunk } from './readChunk'

export const subsToQueue = async () => {
  const queueChannel = await createRabbitMqChannel()
  const supabase = getSupabaseClient()
  const subscribersGenerator = getAllConfirmedSubscribersPaginated({
    batchSize: 1000,
    supabase,
    selectQuery: 'id, email, skillsId, startedWorkingAt, isConfirmed',
  })
  for await (const subscribersChunk of subscribersGenerator) {
    console.log(`Processed ${subscribersChunk.length}`)
    await readChunk(subscribersChunk, queueChannel)
  }
}
