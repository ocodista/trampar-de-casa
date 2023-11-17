import { getSupabaseClient } from 'db'
import { getAllConfirmedSubscribersPaginated } from 'db/src/supabase/domains/subscribers/getAllConfirmedSubscribersPaginated'
import { createRabbitMqChannel } from 'shared'
import { writeToQueues } from './writeToQueues'

export const subsToQueue = async () => {
  const queueChannel = await createRabbitMqChannel()
  const supabase = getSupabaseClient()
  const subscribersGenerator = getAllConfirmedSubscribersPaginated({
    batchSize: 1_000,
    supabase,
    selectQuery: 'id, email, skillsId, startedWorkingAt, isConfirmed',
  })

  for await (const subscribersChunk of subscribersGenerator) {
    console.log(`Processing... ${subscribersChunk.length}`)
    console.time(`Processed ${subscribersChunk.length}`)
    await writeToQueues(subscribersChunk, queueChannel)
    console.timeEnd(`Processed ${subscribersChunk.length}`)
  }
}
