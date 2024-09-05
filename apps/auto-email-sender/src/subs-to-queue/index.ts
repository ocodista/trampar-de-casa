import { getSupabaseClient } from 'db'
import { getAllConfirmedSubscribersPaginated } from 'db/src/supabase/domains/subscribers/getAllConfirmedSubscribersPaginated'
import { EmailQueues, createRabbitMqChannel, logger } from 'shared'

export const subsToQueue = async () => {
  const supabase = getSupabaseClient()
  const subscribersGenerator = getAllConfirmedSubscribersPaginated({
    batchSize: 1_000,
    supabase,
    selectQuery: 'id, email, skillsId, startedWorkingAt, isConfirmed',
  })

  const queueChannel = await createRabbitMqChannel()
  await queueChannel.assertQueue(EmailQueues.RolesAssignerSubs)
  await queueChannel.assertQueue(EmailQueues.EmailPreRenderSubs)
  let subscribersCount = 0,
    prerenderStops = 0,
    rolesAssignerStops = 0
  let count = 0
  for await (const subscribersChunk of subscribersGenerator) {
    count += subscribersChunk.length
    const messages = subscribersChunk.map(
      ({ id, email, isConfirmed, skillsId, startedWorkingAt }) => ({
        rolesAssigner: Buffer.from(
          JSON.stringify({
            id,
            email,
            isConfirmed,
            skillsId,
            startedWorkingAt,
          })
        ),
        emailPreRender: Buffer.from(JSON.stringify({ id, email })),
      })
    )

    for (const message of messages) {
      subscribersCount = subscribersCount + 1
      const rolesAssignerOk = queueChannel.sendToQueue(
        EmailQueues.RolesAssignerSubs,
        message.rolesAssigner
      )
      if (!rolesAssignerOk) {
        rolesAssignerStops = rolesAssignerStops + 1
        await new Promise((resolve) => queueChannel.once('drain', resolve))
      }

      const emailPreRenderOk = queueChannel.sendToQueue(
        EmailQueues.EmailPreRenderSubs,
        message.emailPreRender
      )
      if (!emailPreRenderOk) {
        prerenderStops = prerenderStops + 1
        await new Promise((resolve) => queueChannel.once('drain', resolve))
      }
    }
  }
  const queueEmailPreRenderSubs = await queueChannel.checkQueue(
    EmailQueues.EmailPreRenderSubs
  )
  const queueRolesAssignerSubs = await queueChannel.checkQueue(
    EmailQueues.RolesAssignerSubs
  )
  logger({ queueEmailPreRenderSubs, queueRolesAssignerSubs })
}
