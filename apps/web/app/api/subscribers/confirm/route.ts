import { StatusCodes } from "http-status-codes"
import { NextResponse } from "next/server"
import { getSupabaseClient } from "../../../db/getSupabaseClient"
import { decrypt } from "../../../security/cryptography"
import { Entities } from 'shared/src/enums';

export async function POST (request: Request) {
  const body = await request.json()
  if (!body.id)
    return new NextResponse(null, { status: StatusCodes.BAD_REQUEST })

  const realId = decrypt(body.id)
  const supabase = getSupabaseClient()
  const { data, error } = await supabase.from(Entities.Subcribers).update({ isConfirmed: true }).eq('id', realId).select()

  if (!error)
    return NextResponse.json(data)

  // eslint-disable-next-line no-console
  console.error(error)
  return new NextResponse(null, { status: StatusCodes.INTERNAL_SERVER_ERROR })
}