import { StatusCodes } from 'http-status-codes'
import { NextResponse } from 'next/server'
import { sendConfirmationEmail } from 'shared/src/email'
import { SupabaseCodes } from 'shared/src/enums'
import { logError } from '../logError'
import { insertSubscriber } from './db'

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
    return error.code === SupabaseCodes.DuplicatedRow
      ? new NextResponse('Email já cadastrado.', {
          status: StatusCodes.CONFLICT,
        })
      : await logError(error)
  }

  try {
    await sendConfirmationEmail({
      secretKey: process.env['CRYPT_SECRET'],
      to: email,
      resendKey: process.env['RESEND_KEY'],
      subscriberId: data[0].id,
    })
  } catch (err) {
    await logError(err)
  }

  return NextResponse.json(data)
}
