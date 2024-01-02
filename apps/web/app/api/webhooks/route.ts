import { StatusCodes } from 'http-status-codes'
import { NextResponse } from 'next/server'

interface WebhookRequest {
  type: string
}

/* eslint-disable import/no-anonymous-default-export */
export async function POST(request: Request) {
  const payload = (await request.json()) as WebhookRequest
  if (payload?.type !== 'email.bounced') {
    return new NextResponse(null, { status: StatusCodes.BAD_REQUEST })
  }

  // TODO: Validate signing secret
  // TODO: Update email to opt out

  res.status(200)
}
