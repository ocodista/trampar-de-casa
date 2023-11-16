import { getSupabaseClient } from 'db'
import { getAllConfirmedSubscribersPaginated } from 'db/src/supabase/domains/subscribers/getAllConfirmedSubscribersPaginated'
import dotenv from 'dotenv'
import { MongoCollection, getMongoConnection } from 'shared'
import { createRabbitMqChannel } from 'shared/src/queue/createRabbitMqChannel'
import { renderHeaderAndFooter } from './renderHeaderAndFooter'
import { sendToQueue } from './sendToQueue'
dotenv.config()

export const BATCH_SIZE = 1_000
export async function emailPreRender() {
  throw new Error('[TEST]Not has subscriber')
  const mongoConnection = await getMongoConnection()
  const mongoDatabase = mongoConnection.db('auto-email-sender')
  const mongoCollection = mongoDatabase.collection(
    MongoCollection.RolesAssigner
  )
  const channel = await createRabbitMqChannel()
  const supabaseClient = getSupabaseClient()
  const subscribersGenerator = getAllConfirmedSubscribersPaginated({
    supabase: supabaseClient,
    batchSize: BATCH_SIZE,
    selectQuery: 'email,id',
  })

  let count = 0
  for await (const subscribers of subscribersGenerator) {
    count += subscribers.length
    console.log(`Rendering ${subscribers.length}...`)
    const logText = `Processed: ${count}`
    console.time(logText)
    for (const { email, id } of subscribers) {
      const subscriber = await mongoCollection.findOne({ id })
      if (!subscriber) continue
      const { rolesId } = subscriber as unknown as { rolesId: string[] }

      const { footerHTML, headerHTML } = await renderHeaderAndFooter(
        id,
        rolesId
      )

      await sendToQueue(channel, {
        [email]: {
          footerHTML,
          headerHTML,
          roles: rolesId,
        },
      })
    }
    console.timeEnd(logText)
  }

  await mongoConnection.close()
  process.exit(0)
}
