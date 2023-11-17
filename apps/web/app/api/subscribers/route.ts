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

  const { data, error } = await insertSubscriber(email)

  try {
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
  } catch (err) {
    return logError(err)
  }

  return NextResponse.json(data)
}
