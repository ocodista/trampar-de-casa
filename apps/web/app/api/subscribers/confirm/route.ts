import { Events } from 'analytics'

import { getSupabaseClient } from 'db'
import { StatusCodes } from 'http-status-codes'
import { NextResponse } from 'next/server'
import { sendProfileEmail } from 'shared/src/email/sendProfileEmail'
import { Entities } from 'shared/src/enums'
import { getTracker } from '../../../utils/tracker'
import { getDecryptedId } from '../../getDecryptedId'
const tracker = getTracker()

export async function POST(request: Request) {
  const body = await request.json()
  if (!body.id)
    return new NextResponse(null, { status: StatusCodes.BAD_REQUEST })

  const id = getDecryptedId(body.id)
  const supabase = getSupabaseClient()
  const { data, error } = await supabase
    .from(Entities.Subscribers)
    .update({ isConfirmed: true })
    .eq('id', id)
    .select()
  if (error)
    return new NextResponse(null, { status: StatusCodes.INTERNAL_SERVER_ERROR })

  tracker.track(Events.ConfirmedSubscriber, {
    distinct_id: data[0].email,
  })
  await sendProfileEmail({
    email: data[0].email,
    id: data[0].id,
  })

  return new NextResponse()
}
