import { getPostgresClient } from 'db'
import { StatusCodes } from 'http-status-codes'
import { NextResponse } from 'next/server'

const db = getPostgresClient()

export async function PUT(request: Request) {
  try {
    const { id } = await request.json()

    if (!id) {
      return new NextResponse('ID is required', {
        status: StatusCodes.BAD_REQUEST,
      })
    }

    const subscriber = await db.getSubscriberById(id)
    if (!subscriber) {
      return new NextResponse('Subscriber not found', {
        status: StatusCodes.NOT_FOUND,
      })
    }

    await db.updateSubscriber(id, { optOut: true })

    return new NextResponse('Successfully opted out', {
      status: StatusCodes.OK,
    })
  } catch (error) {
    console.error('Opt out subscriber error:', error)
    return new NextResponse(null, { status: StatusCodes.INTERNAL_SERVER_ERROR })
  }
}
