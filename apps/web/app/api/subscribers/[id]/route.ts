import { getPostgresClient } from 'db'
import { StatusCodes } from 'http-status-codes'
import { NextResponse } from 'next/server'
import { ZodError } from 'zod'
import { Events } from 'analytics'
import { getTracker } from '../../../utils/tracker'
import {
  ProfileSchema,
  profileFormSchema,
} from '../../../subscribers/profile/profileSchema'
import { logError } from '../../logError'
import { EnglishLevel } from '../../../../global/EnglishLevel'
import { getDecryptedId } from '../../getDecryptedId'

const db = getPostgresClient()
const tracker = getTracker()

export async function PUT(
  request: Request,
  { params: { id: hashedId } }: { params: { id: string } }
) {
  try {
    if (!hashedId) {
      return new NextResponse('ID is required', {
        status: StatusCodes.BAD_REQUEST,
      })
    }

    const id = getDecryptedId(hashedId)

    const body = (await request.json()) as ProfileSchema
    await profileFormSchema.parseAsync(body)

    if (body.englishLevel === EnglishLevel.None) {
      body.englishLevel = null
    }

    const { skillsSuggestions, receiveEmailConfig, ...subscriberInfos } = body
    const subscriber = await db.updateSubscriber(id, subscriberInfos)

    if (!subscriber) {
      return new NextResponse('Subscriber not found', {
        status: StatusCodes.NOT_FOUND,
      })
    }

    tracker.track(Events.ProfileChanged, {
      distinct_id: subscriber.email,
    })

    if (subscriber.sendBestOpenings) {
      tracker.track(Events.ReceiveBestOpenings, {
        distinct_id: subscriber.email,
      })
    }

    if (receiveEmailConfig) {
      await db.updateSubscriberTopics(id, receiveEmailConfig.map(Number))
    }

    if (skillsSuggestions?.length) {
      const suggestionsInsertPromise = skillsSuggestions.map((skill) => {
        return db.query(
          `INSERT INTO "skillsSuggestions" ("isApproved", "skillName", "userId") VALUES ($1, $2, $3)`,
          [false, skill, id]
        )
      })
      await Promise.all(suggestionsInsertPromise)
    }

    return NextResponse.json(subscriber)
  } catch (error) {
    if (error instanceof ZodError) {
      return new NextResponse(error.message, {
        status: StatusCodes.BAD_REQUEST,
      })
    }
    return logError(error)
  }
}

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    if (!params.id) {
      return new NextResponse('ID is required', {
        status: StatusCodes.BAD_REQUEST,
      })
    }

    const subscriber = await db.getSubscriberById(params.id)
    if (!subscriber) {
      return new NextResponse('Subscriber not found', {
        status: StatusCodes.NOT_FOUND,
      })
    }

    const topics = await db.getSubscriberTopics(params.id)
    const roles = await db.getSubscriberRoles(params.id)

    return NextResponse.json({
      ...subscriber,
      topics,
      roles,
    })
  } catch (error) {
    return new NextResponse(null, { status: StatusCodes.INTERNAL_SERVER_ERROR })
  }
}
