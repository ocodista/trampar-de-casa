import { StatusCodes } from "http-status-codes";
import { NextResponse } from "next/server";
import Email from "vercel-email"

export const runtime = 'edge';

export async function POST (request: Request) {
  const body = await request.json()
  const field = process.env['EMAIL_KEY']
  if (!body[field] || body[field] !== process.env['EMAIL_PASS'])
    return new NextResponse(null, { status: StatusCodes.UNAUTHORIZED })

  const { to, from, subject, html, text } = body
  if (!("text" in body || "html" in body)) {
    return new NextResponse(null, { status: StatusCodes.BAD_REQUEST })
  }

  if ("text" in body) {
    await Email.send({
      to,
      from,
      subject,
      text
    })
  } else if ("html" in body) {
    await Email.send({
      to,
      from,
      subject,
      html
    })
  }
  
  return new NextResponse(null, { status: StatusCodes.OK })
}