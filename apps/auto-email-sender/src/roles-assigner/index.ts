import { GetMessage } from 'amqplib'
import { saveSubscriberRoles } from 'db/src/mongodb/domains/roles/saveSubscriberRoles'
import { SupabaseTable } from 'db/src/supabase/utilityTypes'
import dotenv from 'dotenv'
import axios from 'axios'
import {
  EmailQueues,
  MongoCollection,
  createRabbitMqChannel,
  getMongoConnection,
  logger,
} from 'shared'
import { getEmailProps } from './getEmailProps'
import { top40Roles } from 'db/src/supabase/domains/roles/getSubscriberRoles'
import { getPostgresClient } from 'db'

dotenv.config()

type Subscriber = SupabaseTable<'Subscribers'>

const FASTAPI_ENDPOINT = 'http://127.0.0.1:8000/best_role'

export const assignRoles = async () => {
  logger.time('assignRoles')
  const mongoConnection = await getMongoConnection()
  const mongoDatabase = mongoConnection.db('auto-email-sender')
  const mongoCollection = mongoDatabase.collection(
    MongoCollection.RolesAssigner
  )
  const postgres = getPostgresClient()
  const channel = await createRabbitMqChannel()
  let msg: GetMessage | false,
    count = 0

  let processedCount = 0
  do {
    msg = await channel.get(EmailQueues.RolesAssignerSubs)
    if (!msg) break
    processedCount += 1
    count = count + 1
    const subscriber = JSON.parse(msg.content.toString()) as Subscriber
    try {
      if (subscriber.skillsId) {
        const skills = subscriber.skillsId.map((id: string) => id)
        const skillsStr = skills.join(',')
        const languages = 'English,Portuguese'

        const response = await axios.get(FASTAPI_ENDPOINT, {
          params: {
            skills: skillsStr,
            languages,
            n: 40,
          },
        })

        const roles = response.data.result

        const emailProps = getEmailProps(subscriber, roles)
        await saveSubscriberRoles(mongoCollection, emailProps)
        channel.ack(msg)
      } else {
        const roles = await top40Roles(postgres)
        const emailProps = getEmailProps(subscriber, roles)
        await saveSubscriberRoles(mongoCollection, emailProps)
        channel.ack(msg)
      }

      if (processedCount % 100 === 0) {
        console.log(
          `Processed ${processedCount} messages in process ${process.pid}.`
        )
      }
    } catch (e) {
      logger.error(e)
      channel.nack(msg, false, true)
    }
  } while (msg)

  await mongoConnection.close()
  logger.timeEnd('assignRoles')
}
