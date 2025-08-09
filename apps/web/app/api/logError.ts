import { StatusCodes } from 'http-status-codes'
import { NextResponse } from 'next/server'

export function logError(error: unknown) {
  return new NextResponse(null, { status: StatusCodes.INTERNAL_SERVER_ERROR })
}
