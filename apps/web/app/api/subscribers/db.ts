import { EnglishLevel, getSupabaseClient } from 'db'
import { StatusCodes } from 'http-status-codes'
import { NextResponse } from 'next/server'
import { Entities } from 'shared'
import { ProfileSchema } from '../../subscribers/profile/profileSchema'

const supabaseClient = getSupabaseClient()
const table = Entities.Subcribers
export const PUBLIC_FIELDS_KEYS =
  'name, linkedInUrl, gitHub, startedWorkingAt, skillsId, englishLevel'
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
  Promise.all(
    topicIds.map(async (topicId) => {
      const { error } = await supabaseClient
        .from(Entities.SubscriberTopics)
        .insert({
          subscriberId: subscriberId,
          topicId,
        })
      if (error) {
        console.error(error)
      }
    })
  )
}

export async function updateSubscriber(
  id: string,
  { receiveEmailConfig, ...body }: ProfileSchema
) {
  const { data, error } = await supabaseClient
    .from(Entities.Subcribers)
    .update({
      ...body,
      name: body.name,
      linkedInUrl: body.linkedInUrl,
      gitHub: body.gitHub,
      startedWorkingAt: body.startedWorkingAt,
      skills: body.skillsId,
      englishLevel: EnglishLevel[body.englishLevel],
    })
    .eq('id', id)
    .select()
  await updateSubscriberTopics(id, receiveEmailConfig)

  return { data, error }
}
