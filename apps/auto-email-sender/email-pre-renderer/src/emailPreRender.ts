import { getSupabaseClient } from 'db'
import { getAllSubscribers } from 'db/src/supabase/domains/subscribers/getAllSubscribers'
import dotenv from 'dotenv'
import {
  MongoCollection,
  createRabbitMqChannel,
  getMongoConnection,
} from 'shared'
import { CONFIG } from './config'
import { renderFooter } from './renderFooter'
import { renderHeader } from './renderHeader'
import { sendToQueue } from './sendToQueue'
dotenv.config()

export async function emailPreRender() {
  const mongoConnection = await getMongoConnection()
  const mongoDatabase = mongoConnection.db('auto-email-sender')
  const mongoCollection = mongoDatabase.collection(
    MongoCollection.RolesAssigner
  )
  const supabaseClient = getSupabaseClient()
  const channel = await createRabbitMqChannel({
    password: CONFIG.RABBITMQ_PASS,
    user: CONFIG.RABBITMQ_USER,
  })

  const subscriberRolesAndEmail: {
    rolesId: string[]
    email: string
    id: string
  }[] = []
  const data = await getAllSubscribers(supabaseClient)
  if (!data) return
  for (const { email, id } of data) {
    const subscriber = await mongoCollection.findOne({ id })
    if (subscriber) {
      const { rolesId } = subscriber as unknown as { rolesId: string[] }
      subscriberRolesAndEmail.push({ rolesId, email, id })
    }
  }
  for (const { email, id, rolesId } of subscriberRolesAndEmail) {
    const promiseFooterHTML = new Promise<string>((resolve) =>
      resolve(renderFooter(id, CONFIG.URL_PREFIX))
    )
    const promiseHeaderHTML = new Promise<string>((resolve) =>
      resolve(renderHeader(rolesId))
    )
    const [footerHTML, headerHTML] = await Promise.all([
      promiseFooterHTML,
      promiseHeaderHTML,
    ])

    await sendToQueue(channel, {
      [email]: {
        footerHTML,
        headerHTML,
        roles: rolesId,
      },
    })
  }

  await mongoConnection.close()
}
