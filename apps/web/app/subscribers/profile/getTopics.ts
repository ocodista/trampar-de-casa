import { getSupabaseClient } from 'db'
import { notFound } from 'next/navigation'
import { Entities } from 'shared'
import { z } from 'zod'

const TopicsSchema = z.array(
  z.object({
    id: z.number(),
    name: z.string(),
  })
)
export const getTopics = async () => {
  const supabase = getSupabaseClient()
  const { data, error } = await supabase.from(Entities.Topics).select('*')
  const topics = TopicsSchema.safeParse(data)

  if (error || !topics.success) {
    console.error(error, data)
    notFound()
  }

  return topics.data as { id: number; name: string }[]
}
