import { getPostgresClient } from 'db'
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
  const postgres = getPostgresClient()
  const { rows: topicsData } = await postgres.query(
    `SELECT * FROM ${Entities.Topics}`
  )
  const topics = TopicsSchema.safeParse(topicsData)

  if (!topics.success) {
    notFound()
  }

  return topics.data as { id: number; name: string }[]
}
