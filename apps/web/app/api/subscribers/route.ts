import { NextResponse } from 'next/server'
import { StatusCodes } from 'http-status-codes'
import { SupabaseCodes } from 'shared/src/enums'
import { sendConfirmationEmail } from 'shared/src/email'
import { profileFormSchema } from '../../subscriber/profile/profileSchema'
import { ZodError } from 'zod'
import {
  insertSubscriber,
  getCount,
  updateSubscriber,
  UpdateSubscriber,
} from './db'

interface EmailRequest {
  email: string
}

async function logError(error: unknown) {
  // eslint-disable-next-line no-console
  console.error(error)
  return new NextResponse(null, { status: StatusCodes.INTERNAL_SERVER_ERROR })
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

export async function PUT(request: Request) {
  const body = (await request.json()) as UpdateSubscriber

  if (!body.id) {
    return new NextResponse(null, { status: StatusCodes.BAD_REQUEST })
  }

  try {
    await profileFormSchema.parseAsync(body)
  } catch (err) {
    if (err instanceof ZodError) {
      return new NextResponse(err.message, { status: StatusCodes.BAD_REQUEST })
    }
    return await logError(err)
  }

  const { data, error } = await updateSubscriber(body)
  return error ? await logError(error) : NextResponse.json(data)
}
