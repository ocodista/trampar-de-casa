'use server'
import { getPostgresClient } from 'db'
import { Subscriber } from 'db/src/types'
import { EnglishLevel } from 'global/EnglishLevel'
import { notFound } from 'next/navigation'
import { z } from 'zod'

const db = getPostgresClient()

// const PUBLIC_FIELDS_KEYS = ['email', 'name', 'linkedInUrl', 'gitHub'] as const

const SubscriberSchema = z.object({
  name: z.string().nullable(),
  linkedInUrl: z.string().url().nullable(),
  gitHub: z.string().url().nullable(),
  startedWorkingAt: z.date().nullable(),
  skillsId: z.array(z.string()).nullable(),
  englishLevel: z.nativeEnum(EnglishLevel).nullable(),
  sendBestOpenings: z.boolean(),
})

export const getById = async (id: string): Promise<Subscriber | null> => {
  return db.getSubscriberById(id)
}

export const getSubscriber = async (subscriberId: string) => {
  const response = await getById(subscriberId)
  if (!response) {
    notFound()
  }

  const subscriberData = response
  const subscriber = SubscriberSchema.safeParse(subscriberData)
  if (!subscriber.success) {
    notFound()
  }

  return subscriber.data
}
