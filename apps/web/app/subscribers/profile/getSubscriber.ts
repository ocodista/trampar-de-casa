'use server'
import { PUBLIC_FIELDS_KEYS } from 'app/api/subscribers/db'
import { getSupabaseClient } from 'db'
import { EnglishLevel } from 'global/EnglishLevel'
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
  if (subscribeErrors) {
    console.error(subscribeErrors, subscriberData, subscriberData)
    notFound()
  }
  const subscriber = SubscriberSchema.safeParse(subscriberData[0])
  if (!subscriber.success) {
    notFound()
  }

  return subscriber.data as z.TypeOf<typeof SubscriberSchema>
}
