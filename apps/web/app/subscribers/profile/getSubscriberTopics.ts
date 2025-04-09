import { getPostgresClient } from 'db'
import { Entities } from 'shared'
import { z } from 'zod'

const SubscriberTopicsSchema = z.array(
  z.object({
    id: z.number(),
    subscriberId: z.string(),
    topicId: z.number(),
  })
)
export const getSubscriberTopics = async (subscriberId: string) => {
  const postgres = getPostgresClient()
  const { rows: subscriberTopicsData } = await postgres.query(
    `SELECT * FROM ${Entities.SubscriberTopics} WHERE "subscriberId" = $1`,
    [subscriberId]
  )

  const subscriberTopics =
    SubscriberTopicsSchema.safeParse(subscriberTopicsData)

  return subscriberTopics.data
}
