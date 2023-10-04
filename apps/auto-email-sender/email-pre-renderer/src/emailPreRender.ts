import dotenv from 'dotenv'
import { MongoCollection, createRabbitMqChannel } from 'shared'
import { CONFIG } from './config'
import { getAllSubscribers } from './getAllSubscribers'
import { getMongoConnection } from './mongo'
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
  const channel = await createRabbitMqChannel({
    password: CONFIG.RABBITMQ_PASS,
    user: CONFIG.RABBITMQ_USER,
  })

  const subscriberRolesAndEmail: {
    rolesId: string[]
    email: string
    id: string
  }[] = []
  const data = await getAllSubscribers()
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
