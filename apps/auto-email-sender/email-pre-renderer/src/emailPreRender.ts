import { getSupabaseClient } from 'db'
import dotenv from 'dotenv'
import {
  Entities,
  MongoCollection,
  createRabbitMqChannel,
  getMongoConnection,
} from 'shared'
import { CONFIG } from './config'
import { getAllConfirmedSubscribersPaginated } from './getAllConfirmedSubscribersPaginated'
import { renderHeaderAndFooter } from './renderHeaderAndFooter'
import { sendToQueue } from './sendToQueue'
dotenv.config()

export const BATCH_SIZE = 100
export async function emailPreRender() {
  console.time('emailPreRender')
  const mongoConnection = await getMongoConnection()
  const mongoDatabase = mongoConnection.db('auto-email-sender')
  const mongoCollection = mongoDatabase.collection(
    MongoCollection.RolesAssigner
  )
  const channel = await createRabbitMqChannel({
    password: CONFIG.RABBITMQ_PASS,
    user: CONFIG.RABBITMQ_USER,
  })

  const supabaseClient = getSupabaseClient()
  const subscribersGenerator = getAllConfirmedSubscribersPaginated({
    supabase: supabaseClient,
    entity: Entities.Subcribers,
    batchSize: BATCH_SIZE,
  })

  for await (const subscribers of subscribersGenerator) {
    for (const { email, id } of subscribers) {
      const subscriber = await mongoCollection.findOne({ id })
      if (!subscriber) break
      const { rolesId } = subscriber as unknown as { rolesId: string[] }

      const { footerHTML, headerHTML } = await renderHeaderAndFooter(
        email,
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
  }

  await mongoConnection.close()
  console.timeEnd('emailPreRender')
}
