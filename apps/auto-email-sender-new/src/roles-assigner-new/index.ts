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
import { getSupabaseClient } from 'db'

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
  const supabaseClient = getSupabaseClient()
  const channel = await createRabbitMqChannel()
  let msg: GetMessage | false,
    count = 0

  do {
    msg = await channel.get(EmailQueues.RolesAssignerSubs)
    if (!msg) break
    count = count + 1
    const subscriber = JSON.parse(msg.content.toString()) as Subscriber
    try {
      if (subscriber.skillsId) {
        const skills = subscriber.skillsId.map((id) => id)
        const skillsStr = skills.join(',')
        const languages = 'English,Portuguese'

        console.log('Fazendo requisição')
        const response = await axios.get(FASTAPI_ENDPOINT, {
          params: {
            skills: skillsStr,
            languages,
            n: 40,
          },
        })
        console.log('finalizando requisição')

        const roles = response.data.result

        console.log(
          `Roles encontradas para o usuário ${subscriber.email}: ${roles.length}`
        )

        const emailProps = getEmailProps(subscriber, roles)
        await saveSubscriberRoles(mongoCollection, emailProps)
        channel.ack(msg)
      } else {
        console.log(`Subscriber ${subscriber.email} has no skillsId`)
        const roles = await top40Roles(supabaseClient)
        console.log(
          `Roles encontradas para o usuário ${subscriber.email}: ${roles.length}`
        )
        const emailProps = getEmailProps(subscriber, roles)
        await saveSubscriberRoles(mongoCollection, emailProps)
        channel.ack(msg)
      }
    } catch (e) {
      logger.error(e)
      channel.nack(msg, false, true)
    }
  } while (msg)

  await mongoConnection.close()
  logger.timeEnd('assignRoles')
}
