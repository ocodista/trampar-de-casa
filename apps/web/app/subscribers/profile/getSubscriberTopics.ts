import { getSupabaseClient } from 'db'
import { notFound } from 'next/navigation'
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
  const supabase = getSupabaseClient()
  const { data: subscriberTopicsData, error: subscriberTopicsError } =
    await supabase
      .from(Entities.SubscriberTopics)
      .select('*')
      .eq('subscriberId', subscriberId)
  const subscriberTopics =
    SubscriberTopicsSchema.safeParse(subscriberTopicsData)

  if (subscriberTopicsError || !subscriberTopics.success) {
    notFound()
  }
  return subscriberTopics.data
}
