import { GetMessage } from 'amqplib'
import { saveSubscriberRoles } from 'db/src/mongodb/domains/roles/saveSubscriberRoles'
import { Subscriber } from 'db/src/types'
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
import { CONFIG } from '../email-sender/config'

dotenv.config()

const MATCH_ROLES_URL = process.env.MATCH_ROLES_URL || 'http://match-roles:8000'
const FASTAPI_ENDPOINT = `${MATCH_ROLES_URL}/best_role`

export const assignRoles = async () => {
  logger.time('assignRoles')
  console.log(`🔄 W${process.pid}`)

  const mongoConnection = await getMongoConnection()
  const mongoDatabase = mongoConnection.db('auto-email-sender')
  const mongoCollection = mongoDatabase.collection(
    MongoCollection.RolesAssigner
  )
  const channel = await createRabbitMqChannel()

  // Get initial queue size for progress tracking
  const initialQueueInfo = await channel.checkQueue(
    EmailQueues.RolesAssignerSubs
  )
  const maxMessages = initialQueueInfo.messageCount

  let msg: GetMessage | false,
    count = 0

  let processedCount = 0
  let totalRolesAssigned = 0
  let withSkillsCount = 0
  let withoutSkillsCount = 0
  let errorCount = 0

  do {
    msg = await channel.get(EmailQueues.RolesAssignerSubs)
    if (!msg) break
    processedCount += 1
    count = count + 1
    const subscriber = JSON.parse(msg.content.toString()) as Subscriber

    try {
      if (subscriber.skillsId) {
        withSkillsCount += 1
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
        if (roles && roles.length > 0) {
          totalRolesAssigned += roles.length
        }

        const emailProps = getEmailProps(subscriber, roles)
        await saveSubscriberRoles(mongoCollection, emailProps)
        channel.ack(msg)
      } else {
        withoutSkillsCount += 1
        const roles = await top40Roles()

        if (roles && roles.length > 0) {
          totalRolesAssigned += roles.length
        }

        const emailProps = getEmailProps(subscriber, roles)
        await saveSubscriberRoles(mongoCollection, emailProps)
        channel.ack(msg)
      }

      // Show progress every batch
      if (processedCount % CONFIG.EMAIL_BATCH_SIZE === 0) {
        const progress =
          maxMessages > 0 ? Math.round((processedCount / maxMessages) * 100) : 0
        const withSkillsPct =
          processedCount > 0
            ? Math.round((withSkillsCount / processedCount) * 100)
            : 0
        const withoutSkillsPct =
          processedCount > 0
            ? Math.round((withoutSkillsCount / processedCount) * 100)
            : 0
        console.log(
          `W${process.pid}: ${processedCount}/${maxMessages} (${progress}%) | Skills: ${withSkillsCount} (${withSkillsPct}%) | NoSkills: ${withoutSkillsCount} (${withoutSkillsPct}%) | Roles: ${totalRolesAssigned} | Err: ${errorCount}`
        )
      }
    } catch (e) {
      errorCount += 1
      console.error(`❌ Error ${errorCount} in worker ${process.pid}`)
      logger.error(e)
      channel.nack(msg, false, true)
    }
  } while (msg)

  const finalProgress =
    maxMessages > 0 ? Math.round((processedCount / maxMessages) * 100) : 100
  const withSkillsPct =
    processedCount > 0
      ? Math.round((withSkillsCount / processedCount) * 100)
      : 0
  const withoutSkillsPct =
    processedCount > 0
      ? Math.round((withoutSkillsCount / processedCount) * 100)
      : 0
  console.log(
    `🏁 W${process.pid}: ${processedCount}/${maxMessages} (${finalProgress}%) | Skills: ${withSkillsCount} (${withSkillsPct}%) | NoSkills: ${withoutSkillsCount} (${withoutSkillsPct}%) | Roles: ${totalRolesAssigned} | Err: ${errorCount}`
  )

  await mongoConnection.close()
  logger.timeEnd('assignRoles')

  return {
    processedCount,
    totalRolesAssigned,
    withSkillsCount,
    withoutSkillsCount,
    errorCount,
    processId: process.pid,
  }
}
