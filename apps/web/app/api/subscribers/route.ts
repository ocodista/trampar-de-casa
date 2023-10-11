import { StatusCodes } from 'http-status-codes'
import { NextResponse } from 'next/server'
import { sendConfirmationEmail } from 'shared/src/email'
import { SupabaseCodes } from 'shared/src/enums'
import { logError } from '../logError'
import { getSubscriberByEmail, insertSubscriber } from './db'
import { Tracker, Events } from 'analytics'

interface EmailRequest {
  email: string
}

export async function POST(request: Request) {
  const { email } = (await request.json()) as EmailRequest
  if (!email) {
    return new NextResponse(null, { status: StatusCodes.FORBIDDEN })
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
    return await logError(error)
  }

  try {
    const [subscriber] = data
    await sendConfirmationEmail({
      secretKey: process.env['CRYPT_SECRET'],
      to: email,
      resendKey: process.env['RESEND_KEY'],
      subscriberId: subscriber.id,
    })
    new Tracker(process.env['MIXPANEL_KEY']).track(Events.NewSubscriber, {
      distinct_id: subscriber.id,
    })
  } catch (err) {
    await logError(err)
  }

  return NextResponse.json(data)
}
