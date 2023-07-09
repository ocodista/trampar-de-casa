import { StatusCodes } from 'http-status-codes'
import { NextResponse } from 'next/server'
import { Entities } from 'shared'
import { getSupabaseClient } from '../../db/getSupabaseClient'
import { ProfileSchema } from '../../subscriber/profile/profileSchema'

const supabaseClient = getSupabaseClient()
const table = Entities.Subcribers
const PUBLIC_FIELDS =
  'name, linkedInUrl, gitHub, startedWorkingAt, skills, englishLevel'
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
    supabaseClient.from(table).select(PUBLIC_FIELDS).eq('id', id).single()
  )

export async function insertSubscriber(email: string) {
  const { data, error } = await supabaseClient
    .from(Entities.Subcribers)
    .insert({ email })
    .select()
  return { data, error }
}

export async function updateSubscriber(id: string, body: ProfileSchema) {
  const { data, error } = await supabaseClient
    .from(Entities.Subcribers)
    .update(body)
    .eq('id', id)
    .select(PUBLIC_FIELDS)
  return { data, error }
}
