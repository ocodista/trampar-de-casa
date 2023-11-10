import { getSupabaseClient } from 'db'
import { getAllConfirmedSubscribersPaginated } from 'db/src/supabase/domains/subscribers/getAllConfirmedSubscribersPaginated'
import { sendProfileEmail } from './src/email/sendProfileEmail'
;(async () => {
  const supabase = getSupabaseClient()
  const { count } = await supabase
    .from('Subscribers')
    .select('id', { count: 'exact' })
    .eq('isConfirmed', true)
    .eq('optOut', false)
  if (!count) throw new Error('Invalid count')

  const totalChunks = Math.ceil(count / 25)
  let currentChunk = 1

  const subscribersGenerator = getAllConfirmedSubscribersPaginated({
    batchSize: 25,
    supabase,
    selectQuery: 'email,id',
  })
  for await (const subscribersBatch of subscribersGenerator) {
    console.log(`Current chunk: ${currentChunk}/${totalChunks}`)
    await Promise.all(subscribersBatch.map(sendProfileEmail))
    currentChunk = currentChunk + 1
  }
})()
