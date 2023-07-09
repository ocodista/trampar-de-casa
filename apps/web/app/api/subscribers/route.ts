import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { StatusCodes } from 'http-status-codes'
import { getSupabaseClient } from '../../db/getSupabaseClient'
import { Entities, SupabaseCodes } from 'shared/src/enums'
import { sendConfirmationEmail } from 'shared/src/email'
import { kv } from '@vercel/kv'

interface EmailRequest {
  email: string
}

//Time before subs count cache is invalid, in seconds
const KV_CACHE_DURATION = 1800

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

export async function GET() {
  const supabase = createClient(
    process.env['SUPABASE_URL'],
    process.env['SUPABASE_SERVICE_ROLE']
  )

  const getSubsCount = async () => {
    const { count, error } = await supabase
      .from(Entities.Subcribers)
      .select('*', { count: 'exact' })
    return { count, error }
  }

  const cached_count: number = await kv.hget('subscribers', 'count')
  if (cached_count) return NextResponse.json(cached_count)

  const { count, error } = await getSubsCount()
  if (!error) {
    await kv.setex('subscribers', KV_CACHE_DURATION, count)
    return NextResponse.json(count)
  }

  return new NextResponse(null, { status: StatusCodes.INTERNAL_SERVER_ERROR })
}
