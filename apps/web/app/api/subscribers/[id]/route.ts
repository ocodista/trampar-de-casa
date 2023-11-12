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
import { getTracker } from '../../../utils/tracker'

const tracker = getTracker()

export async function GET(request: Request) {
  return await getById(getId(request))
}
export async function PUT(request: Request) {
  try {
    const id = getId(request)
    if (!id) {
      return new NextResponse(null, { status: StatusCodes.BAD_REQUEST })
    }

    const body = (await request.json()) as ProfileSchema
    await profileFormSchema.parseAsync(body)
    const { skillsSuggestions, ...subscriberInfos } = body
    const { data } = await updateSubscriber(id, subscriberInfos)
    tracker.track(Events.ProfileChanged, {
      distinct_id: data[0].email,
    })

    if (data[0].sendBestOpenings) {
      tracker.track(Events.ReceiveBestOpenings, {
        distinct_id: data[0].email,
      })
    }
    if (skillsSuggestions.length) {
      const supabase = getSupabaseClient()
      const suggestionsInsertPromise = skillsSuggestions.map((skill) => {
        return supabase.from('skillsSuggestions').insert({
          isApproved: false,
          skillName: skill,
          userId: id,
        })
      })
      await Promise.all(suggestionsInsertPromise)
    }
    return NextResponse.json(data)
  } catch (error) {
    // TODO: Add this try-catch as global middleware (ErrorHandler)
    if (error instanceof ZodError) {
      return new NextResponse(error.message, {
        status: StatusCodes.BAD_REQUEST,
      })
    }
    return logError(error)
  }
}
