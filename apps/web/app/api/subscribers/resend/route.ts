import { StatusCodes } from 'http-status-codes'
import { NextResponse } from 'next/server'
import { getSubscriberByEmail } from '../db'
import { sendConfirmationEmail } from 'shared'
import { logError } from 'app/api/logError'

export async function POST(request: Request) {
  const { email } = await request.json()

  if (!email) return new NextResponse(null, { status: StatusCodes.BAD_REQUEST })

  const { data, error } = await getSubscriberByEmail(email)

  if (error) {
    return await logError(error)
  }

  const [subscriber] = data
  if (!subscriber)
    return new NextResponse('Usuário não encontrado.', {
      status: StatusCodes.NOT_FOUND,
    })

  if (subscriber.isConfirmed)
    return new NextResponse('Email já confirmado.', {
      status: StatusCodes.CONFLICT,
    })

  try {
    await sendConfirmationEmail({
      secretKey: process.env['CRYPT_SECRET'],
      to: email,
      resendKey: process.env['RESEND_KEY'],
      subscriberId: subscriber.id,
    })
    return new NextResponse(null, { status: StatusCodes.NO_CONTENT })
  } catch (err) {
    await logError(err)
  }
}
