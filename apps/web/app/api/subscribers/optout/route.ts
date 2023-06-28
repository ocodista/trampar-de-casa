import { StatusCodes } from "http-status-codes"
import { NextResponse } from "next/server"
import { getSupabaseClient } from "../../../db/getSupabaseClient"
import { Entities } from 'shared/src/enums';
import { decrypt } from "shared/src/security";

export async function POST (request: Request) {
  try {
    const { id } = await request.json()

    if (!id)
      return new NextResponse(null, { status: StatusCodes.BAD_REQUEST })

    const realId = decrypt(process.env['CRYPT_SECRET'], id as string)
    const supabase = getSupabaseClient()
    const { data, error } = await supabase
      .from(Entities.Subcribers)
      .update({ optOut: true })
      .eq('id', realId)
      .select()

    if (error) throw error

    return NextResponse.json(data)

  } catch (err) {
    console.error(err)
    return new NextResponse(null, { status: StatusCodes.INTERNAL_SERVER_ERROR })
  }

}