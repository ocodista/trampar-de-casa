import { getPostgresClient } from 'db'
import { StatusCodes } from 'http-status-codes'
import { NextResponse } from 'next/server'
import { sendConfirmationEmail } from 'shared/src/email'
import { logError } from '../../logError'

const db = getPostgresClient()

export async function POST(request: Request) {
  try {
    const { email } = await request.json()

    if (!email) {
      return new NextResponse('Email is required', {
        status: StatusCodes.BAD_REQUEST,
      })
    }

    const subscriber = await db.getSubscriberByEmail(email)
    if (!subscriber) {
      return new NextResponse('Subscriber not found', {
        status: StatusCodes.NOT_FOUND,
      })
    }

    if (subscriber.isConfirmed) {
      return new NextResponse('Email already confirmed', {
        status: StatusCodes.CONFLICT,
      })
    }

    try {
      await sendConfirmationEmail({
        secretKey: process.env['CRYPT_SECRET'],
        to: email,
        resendKey: process.env['RESEND_KEY'],
        subscriberId: subscriber.id,
      })

      return new NextResponse('Confirmation email sent', {
        status: StatusCodes.OK,
      })
    } catch (emailError) {
      return logError(emailError)
    }
  } catch (error) {
    return new NextResponse(null, { status: StatusCodes.INTERNAL_SERVER_ERROR })
  }
}
