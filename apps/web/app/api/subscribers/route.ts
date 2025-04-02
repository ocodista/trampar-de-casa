import { Events, Tracker } from 'analytics'
import { StatusCodes } from 'http-status-codes'
import { NextResponse } from 'next/server'
import { sendConfirmationEmail } from 'shared/src/email'
import { SupabaseCodes } from 'shared/src/enums'
import { logError } from '../logError'
import { getSubscriberByEmail, insertSubscriber } from './db'
import { getTracker } from '../../utils/tracker'

interface EmailRequest {
  email: string
}
const tracker = getTracker()

export async function POST(request: Request) {
  const { email } = (await request.json()) as EmailRequest
  if (!email) {
    return new NextResponse(null, { status: StatusCodes.FORBIDDEN })
  }

  try {
    // Check if required environment variables are available
    if (!process.env['RESEND_KEY']) {
      console.error('RESEND_KEY environment variable is missing')
      return new NextResponse('Server configuration error', {
        status: StatusCodes.INTERNAL_SERVER_ERROR,
      })
    }

    if (!process.env['CRYPT_SECRET']) {
      console.error('CRYPT_SECRET environment variable is missing')
      return new NextResponse('Server configuration error', {
        status: StatusCodes.INTERNAL_SERVER_ERROR,
      })
    }

    const { data, error } = await insertSubscriber(email)

    if (error) {
      if (error.code === SupabaseCodes.DuplicatedRow) {
        const { data: subscriber } = await getSubscriberByEmail(email)
        const isConfirmed = subscriber?.length && subscriber[0].isConfirmed
        return NextResponse.json(
          {
            isConfirmed,
            message: isConfirmed
              ? 'Email já cadastrado.'
              : 'Email não confirmado.',
          },
          { status: StatusCodes.CONFLICT }
        )
      }
      return logError(error)
    }

    try {
      const [subscriber] = data as { id: string; email: string }[]

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
      console.error('Error sending confirmation email:', emailError)
      // Return the data even if email sending fails
      // so the user is subscribed but just doesn't get the email
      return NextResponse.json(data)
    }

    return NextResponse.json(data)
  } catch (err) {
    console.error('Subscription process error:', err)
    return logError(err)
  }
}
