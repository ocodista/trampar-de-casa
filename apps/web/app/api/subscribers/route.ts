import { StatusCodes } from 'http-status-codes'
import { NextResponse } from 'next/server'
import { sendConfirmationEmail } from 'shared/src/email'
import { Entities, SupabaseCodes } from 'shared/src/enums'
import { getSupabaseClient } from '../../db/getSupabaseClient'

interface EmailRequest {
  email: string
}

export async function POST(request: Request) {
  const { email } = (await request.json()) as EmailRequest
  if (!email) {
    return new NextResponse(null, { status: 403 })
  }

  const supabase = getSupabaseClient()
  const { data, error } = await supabase
    .from(Entities.Subcribers)
    .insert({ email })
    .select()

  if (!error) {
    try {
      await sendConfirmationEmail({
        secretKey: process.env['CRYPT_SECRET'],
        to: email,
        resendKey: process.env['RESEND_KEY'],
        subscriberId: data[0].id,
      })
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err)
    }
    return NextResponse.json(data)
  }

  if (error.code === SupabaseCodes.DuplicatedRow) {
    return new NextResponse('Email já cadastrado.', {
      status: StatusCodes.CONFLICT,
    })
  }

  // eslint-disable-next-line no-console
  console.error(error)
  return new NextResponse(null, { status: StatusCodes.INTERNAL_SERVER_ERROR })
}
