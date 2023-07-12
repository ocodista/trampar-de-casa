import { getId } from 'app/api/getId'
import { StatusCodes } from 'http-status-codes'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const id = getId(request)
  if (!id) {
    return new NextResponse(null, { status: StatusCodes.BAD_REQUEST })
  }

  return NextResponse.json({ id })
}
