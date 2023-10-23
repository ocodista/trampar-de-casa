import { Events, Tracker } from 'analytics'
import { getSupabaseClient } from 'db'
import { StatusCodes } from 'http-status-codes'
import { NextResponse } from 'next/server'
import { Entities } from 'shared/src/enums'
import { getDecryptedId } from '../../getDecryptedId'

export async function POST(request: Request) {
  const body = await request.json()
  if (!body.id)
    return new NextResponse(null, { status: StatusCodes.BAD_REQUEST })

  const id = getDecryptedId(body.id)
  const supabase = getSupabaseClient()
  const { data, error } = await supabase
    .from(Entities.Subcribers)
    .update({ isConfirmed: true })
    .eq('id', id)
    .select()

  if (!error) return NextResponse.json(data)
  new Tracker(process.env['NEXT_PUBLIC_MIXPANEL_KEY']).track(
    Events.ConfirmedSubscriber,
    {
      distinct_id: data[0].email,
    }
  )
  // eslint-disable-next-line no-console
  console.error(error)
  return new NextResponse(null, { status: StatusCodes.INTERNAL_SERVER_ERROR })
}
