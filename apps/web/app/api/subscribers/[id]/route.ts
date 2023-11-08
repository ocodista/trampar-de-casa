import { Events, Tracker } from 'analytics'
import { getId } from 'app/api/getId'
import { getSupabaseClient } from 'db'
import { StatusCodes } from 'http-status-codes'
import { NextResponse } from 'next/server'
import { ZodError } from 'zod'
import {
  ProfileSchema,
  profileFormSchema,
} from '../../../subscribers/profile/profileSchema'
import { logError } from '../../logError'
import { getById, updateSubscriber } from '../db'

export async function GET(request: Request) {
  return await getById(getId(request))
}
export async function PUT(request: Request) {
  const id = getId(request)

  if (!id) {
    return new NextResponse(null, { status: StatusCodes.BAD_REQUEST })
  }

  const body = (await request.json()) as ProfileSchema
  try {
    await profileFormSchema.parseAsync(body)
  } catch (err) {
    if (err instanceof ZodError) {
      return new NextResponse(err.message, { status: StatusCodes.BAD_REQUEST })
    }
    return await logError(err)
  }

  try {
    const { skillsSuggestions, ...subscriberInfos } = body
    const { data } = await updateSubscriber(id, subscriberInfos)
    const supabase = getSupabaseClient()
    if (skillsSuggestions.length) {
      const suggestionsInsertPromise = skillsSuggestions.map((skill) => {
        return supabase.from('skillsSuggestions').insert({
          isApproved: false,
          skillName: skill,
          userId: id,
        })
      })
      await Promise.all(suggestionsInsertPromise)
    }
    new Tracker(process.env['NEXT_PUBLIC_MIXPANEL_KEY']).track(
      Events.ConfirmedSubscriber,
      {
        distinct_id: data[0].email,
      }
    )
    return NextResponse.json(data)
  } catch (error) {
    return await logError(error)
  }
}
