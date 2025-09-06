import { getPostgresClient } from 'db'
import { StatusCodes } from 'http-status-codes'
import { NextResponse } from 'next/server'
import { decrypt } from 'shared'

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const db = getPostgresClient()
    const { id: encryptedId } = params

    if (!encryptedId) {
      return new NextResponse('ID is required', {
        status: StatusCodes.BAD_REQUEST,
      })
    }

    const secretKey = process.env['CRYPT_SECRET']
    if (!secretKey) {
      throw new Error('Server configuration error')
    }

    const id = decrypt(secretKey, encryptedId)

    const subscriber = await db.getSubscriberById(id)
    if (!subscriber) {
      return new NextResponse('Subscriber not found', {
        status: StatusCodes.NOT_FOUND,
      })
    }

    await db.updateSubscriber(id, { optOut: true })
    console.log('Unsubscribed ' + subscriber.email + ' successfully')

    return new NextResponse('Successfully opted out', {
      status: StatusCodes.OK,
    })
  } catch (error) {
    console.error(error)
    return new NextResponse(null, { status: StatusCodes.INTERNAL_SERVER_ERROR })
  }
}
