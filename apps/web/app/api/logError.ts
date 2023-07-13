import { StatusCodes } from 'http-status-codes'
import { NextResponse } from 'next/server'

export async function logError(error: unknown) {
  // eslint-disable-next-line no-console
  console.error(error)
  return new NextResponse(null, { status: StatusCodes.INTERNAL_SERVER_ERROR })
}
