'use server'
import { PUBLIC_FIELDS_KEYS } from 'app/api/subscribers/db'
import { getSupabaseClient } from 'app/db/getSupabaseClient'
import { EnglishLevel } from 'db'
import { notFound } from 'next/navigation'
import { Entities } from 'shared'
import { z } from 'zod'
import { ProfileSchemaEnum } from './profileSchema'

const SubscriberSchema = z.object({
  [ProfileSchemaEnum.Name]: z.string().nullable(),
  [ProfileSchemaEnum.LinkedInUrl]: z.string().url().nullable(),
  [ProfileSchemaEnum.GitHub]: z.string().url().nullable(),
  [ProfileSchemaEnum.StartedWorkingAt]: z.string().nullable(),
  [ProfileSchemaEnum.Skills]: z.array(z.string()).nullable(),
  [ProfileSchemaEnum.EnglishLevel]: z.nativeEnum(EnglishLevel).nullable(),
})
export const getSubscriber = async (subscriberId: string) => {
  const supabase = getSupabaseClient()
  const { data: subscriberData, error: subscribeErrors } = await supabase
    .from(Entities.Subcribers)
    .select(PUBLIC_FIELDS_KEYS)
    .eq('id', subscriberId)
  const subscriber = SubscriberSchema.safeParse(subscriberData[0])
  if (subscribeErrors || !subscriber.success) {
    console.error(subscribeErrors, subscriber, subscriberData)
    notFound()
  }

  return subscriber.data
}
