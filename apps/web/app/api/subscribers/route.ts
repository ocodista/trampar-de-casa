import { Events } from 'analytics'
import { getPostgresClient } from 'db'
import { StatusCodes } from 'http-status-codes'
import { NextResponse } from 'next/server'
import { sendConfirmationEmail } from 'shared/src/email'
import { logError } from '../logError'
import { getTracker } from '../../utils/tracker'

interface EmailRequest {
  email: string
}

const db = getPostgresClient()
const tracker = getTracker()

export async function POST(request: Request) {
  const { email } = (await request.json()) as EmailRequest

  if (!email) {
    return new NextResponse('Email is required', {
      status: StatusCodes.BAD_REQUEST,
    })
  }

  if (!process.env['RESEND_KEY']) {
    return new NextResponse('Server configuration error', {
      status: StatusCodes.INTERNAL_SERVER_ERROR,
    })
  }

  if (!process.env['CRYPT_SECRET']) {
    return new NextResponse('Server configuration error', {
      status: StatusCodes.INTERNAL_SERVER_ERROR,
    })
  }

  try {
    const existingSubscriber = await db.getSubscriberByEmail(email)
    if (existingSubscriber) {
      return NextResponse.json(
        {
          isConfirmed: existingSubscriber.isConfirmed,
          message: existingSubscriber.isConfirmed
            ? 'Email já cadastrado.'
            : 'Email não confirmado.',
        },
        { status: StatusCodes.CONFLICT }
      )
    }

    const subscriber = await db.insertSubscriber(email)

    try {
      await sendConfirmationEmail({
        secretKey: process.env['CRYPT_SECRET'],
        to: email,
        resendKey: process.env['RESEND_KEY'],
        subscriberId: subscriber.id,
      })

      tracker.track(Events.NewSubscriber, {
        distinct_id: subscriber.email,
      })
    } catch (emailError) {
      // Return the data even if email sending fails
      // so the user is subscribed but just doesn't get the email
      return NextResponse.json(subscriber)
    }

    return NextResponse.json(subscriber)
  } catch (error) {
    return logError(error)
  }
}

export async function PUT(request: Request) {
  try {
    const { id, ...data } = await request.json()

    if (!id) {
      return new NextResponse('ID is required', {
        status: StatusCodes.BAD_REQUEST,
      })
    }

    const subscriber = await db.updateSubscriber(id, data)
    return NextResponse.json(subscriber)
  } catch (error) {
    return new NextResponse(null, { status: StatusCodes.INTERNAL_SERVER_ERROR })
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    const email = searchParams.get('email')

    if (id) {
      const subscriber = await db.getSubscriberById(id)
      if (!subscriber) {
        return new NextResponse('Subscriber not found', {
          status: StatusCodes.NOT_FOUND,
        })
      }
      return NextResponse.json(subscriber)
    }

    if (email) {
      const subscriber = await db.getSubscriberByEmail(email)
      if (!subscriber) {
        return new NextResponse('Subscriber not found', {
          status: StatusCodes.NOT_FOUND,
        })
      }
      return NextResponse.json(subscriber)
    }

    return new NextResponse('ID or email is required', {
      status: StatusCodes.BAD_REQUEST,
    })
  } catch (error) {
    return new NextResponse(null, { status: StatusCodes.INTERNAL_SERVER_ERROR })
  }
}
