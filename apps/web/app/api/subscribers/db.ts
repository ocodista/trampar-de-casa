import { getSupabaseClient } from 'db'
import { SupabaseTable } from 'db/src/supabase/utilityTypes'
import { EnglishLevel } from 'global/EnglishLevel'
import { StatusCodes } from 'http-status-codes'
import { NextResponse } from 'next/server'
import { Entities } from 'shared'
import { ProfileSchema } from '../../subscribers/profile/profileSchema'

const supabaseClient = getSupabaseClient()
const table = Entities.Subcribers
export const PUBLIC_FIELDS_KEYS =
  'name, linkedInUrl, gitHub, startedWorkingAt, skillsId, englishLevel, sendBestOpenings'
const errorResponse = new NextResponse(null, {
  status: StatusCodes.INTERNAL_SERVER_ERROR,
})

const handleResponse = async (query, field = 'data') => {
  const response = await query
  const { error } = response
  const dataField = response[field]
  return error ? errorResponse : NextResponse.json(dataField)
}

export const getCount = async () =>
  await handleResponse(
    supabaseClient.from(table).select('*', { count: 'exact' }),
    'count'
  )

export const getById = async (id: string) =>
  await handleResponse(
    supabaseClient.from(table).select(PUBLIC_FIELDS_KEYS).eq('id', id).single()
  )

export async function insertSubscriber(email: string) {
  const { data, error } = await supabaseClient
    .from(Entities.Subcribers)
    .insert({ email })
    .select()
  return { data, error }
}

const updateSubscriberTopics = async (
  subscriberId: string,
  topicIds: string[]
) => {
  await supabaseClient
    .from(Entities.SubscriberTopics)
    .delete()
    .eq('subscriberId', subscriberId)
  await Promise.all(
    topicIds.map(async (topicId) => {
      const { error } = await supabaseClient
        .from(Entities.SubscriberTopics)
        .insert({
          subscriberId: subscriberId,
          topicId: Number(topicId),
        })
      if (error) {
        console.error(error)
      }
    })
  )
}
type Subscriber = SupabaseTable<'Subscribers'>
export async function updateSubscriber(
  id: string,
  { receiveEmailConfig, ...body }: ProfileSchema
) {
  const sanitizeEnglishLevelInput = (englishLevel: EnglishLevel) => {
    return englishLevel === EnglishLevel.None ? null : englishLevel
  }

  const { data, error } = await supabaseClient
    .from(Entities.Subcribers)
    .update({
      ...body,
      name: body.name,
      linkedInUrl: body.linkedInUrl,
      gitHub: body.gitHub,
      startedWorkingAt:
        body.startedWorkingAt as unknown as Subscriber['startedWorkingAt'],
      skillsId: body.skillsId,
      englishLevel: sanitizeEnglishLevelInput(body.englishLevel),
    })
    .eq('id', id)
    .select()
  await updateSubscriberTopics(id, receiveEmailConfig)
  if (error) throw error
  return { data, error }
}

export async function getSubscriberByEmail(email: string) {
  const { data, error } = await supabaseClient
    .from(Entities.Subcribers)
    .select()
    .eq('email', email)
  return { data, error }
}
