import { getSupabaseClient } from 'db'
import { getAllConfirmedSubscribersPaginated } from 'db/src/supabase/domains/subscribers/getAllConfirmedSubscribersPaginated'
import { EmailQueues, createRabbitMqChannel } from 'shared'

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

  let count = 0
  for await (const subscribersChunk of subscribersGenerator) {
    count += subscribersChunk.length
    console.log(`Processing... ${count}`)
    console.time(`Processed ${count}`)
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

    messages.forEach((message) => {
      queueChannel.sendToQueue(
        EmailQueues.RolesAssignerSubs,
        message.rolesAssigner
      )
      queueChannel.sendToQueue(
        EmailQueues.EmailPreRenderSubs,
        message.emailPreRender
      )
    })
    console.timeEnd(`Processed ${count}`)
  }
}
