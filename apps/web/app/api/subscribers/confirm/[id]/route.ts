import { getPostgresClient } from 'db'
import { StatusCodes } from 'http-status-codes'
import { NextResponse } from 'next/server'
import { sendProfileEmail } from 'shared/src/email/sendProfileEmail'
import { Events } from 'analytics'
import { getTracker } from '../../../../utils/tracker'
import { getDecryptedId } from '../../../getDecryptedId'

const db = getPostgresClient()
const tracker = getTracker()

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id: hashedId } = params
    const id = getDecryptedId(hashedId)

    if (!id) {
      return new NextResponse('ID is required', {
        status: StatusCodes.BAD_REQUEST,
      })
    }

    const subscriber = await db.getSubscriberById(id)
    if (!subscriber) {
      return new NextResponse('Subscriber not found', {
        status: StatusCodes.NOT_FOUND,
      })
    }

    await db.updateSubscriber(id, { isConfirmed: true })

    tracker.track(Events.ConfirmedSubscriber, {
      distinct_id: subscriber.email,
    })

    await sendProfileEmail({
      email: subscriber.email,
      id: subscriber.id,
    })

    return new NextResponse('Email confirmed successfully', {
      status: StatusCodes.OK,
    })
  } catch (error) {
    return new NextResponse(null, { status: StatusCodes.INTERNAL_SERVER_ERROR })
  }
}
