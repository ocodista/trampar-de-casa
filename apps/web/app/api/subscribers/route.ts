import { NextResponse } from 'next/server'
import { StatusCodes } from 'http-status-codes'
import { SupabaseCodes } from 'shared/src/enums'
import { sendConfirmationEmail } from 'shared/src/email'
import { insertSubscriber, getCount } from './db'
import { logError } from '../logError'

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

export async function GET() {
  return await getCount()
}
