import { Roles } from 'db'
import { RedisClientType } from 'redis'
import { z } from 'zod'

// interface OpeningsEmail {
//   globalOpenings: Opening[]
//   localOpenings: Opening[]
//   feedbackFormUrl: string
// }

const openingsSchema = z.object({
  company: z.string(),
  title: z.string(),
  description: z.string(),
  location: z.string(),
  language: z.string(),
  currency: z.string().nullable(),
  salary: z.string().nullable(),
  skillsId: z.array(z.string()).default([]),
  headerInfo: z.string(),
  url: z.string().nullable(),
})
const openingsEmailSchema = z.object({
  globalOpenings: z.array(openingsSchema),
  localOpenings: z.array(openingsSchema),
})
export const storeSubscriberProps = async (
  subscriberId: string,
  roles: Roles[],
  redisClient: RedisClientType
) => {
  // Is important this props has te same format of props received on OpeningEmail component
  const globalOpenings: unknown[] = []
  const localOpenings: unknown[] = []
  roles.forEach((role) => {
    const opening: z.infer<typeof openingsSchema> = {
      company: role.title,
      currency: role.currency,
      description: role.description,
      headerInfo: role.description,
      language: role.language,
      location: role.country,
      salary: role.salary,
      skillsId: role.skillsId,
      title: role.title,
      url: role.url,
    }
    if (role.country === 'Brasil') {
      localOpenings.push(opening)
      return
    }
    globalOpenings.push(opening)
  })
  console.log({ globalOpenings, localOpenings })

  await redisClient.set(
    `subscriber:${subscriberId}`,
    JSON.stringify(openingsEmailSchema.parse({ globalOpenings, localOpenings }))
  )
}
