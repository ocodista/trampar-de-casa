import { getPostgresClient } from 'db'
import { getAllConfirmedSubscribersPaginated } from 'db/src/supabase/domains/subscribers/getAllConfirmedSubscribersPaginated'
import { sendProfileEmail } from './src/email/sendProfileEmail'
;(async () => {
  const postgres = getPostgresClient()
  const result = await postgres.query(
    'SELECT COUNT(*) FROM Subscribers WHERE "isConfirmed" = true AND "optOut" = false'
  )
  const count = parseInt(result.rows[0]?.count || '0')
  if (!count) throw new Error('Invalid count')

  const totalChunks = Math.ceil(count / 25)
  let currentChunk = 1

  const subscribersGenerator = getAllConfirmedSubscribersPaginated({
    batchSize: 25,
    postgres,
    selectQuery: 'email,id',
  })
  for await (const subscribersBatch of subscribersGenerator) {
    console.log(`Current chunk: ${currentChunk}/${totalChunks}`)
    await Promise.all(subscribersBatch.map(sendProfileEmail))
    currentChunk = currentChunk + 1
  }
})()
