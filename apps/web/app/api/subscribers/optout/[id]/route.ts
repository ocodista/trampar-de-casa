import { getPostgresClient } from 'db'
import { StatusCodes } from 'http-status-codes'
import { NextResponse } from 'next/server'
import { decrypt } from 'shared'

// Handle one-click unsubscribe POST request per Resend requirements
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

    // Log successful unsubscribe with timestamp
    console.log(
      `✅ [${new Date().toISOString()}] Successfully unsubscribed: ${
        subscriber.email
      } (ID: ${id})`
    )
    console.log(`   Method: One-click POST`)
    console.log(`   Subscriber opted out successfully`)

    // Per Resend docs: return blank page with 200 or 202 for one-click unsubscribe
    return new NextResponse('', {
      status: StatusCodes.OK,
    })
  } catch (error) {
    console.error('Error processing one-click unsubscribe:', error)
    return new NextResponse(null, { status: StatusCodes.INTERNAL_SERVER_ERROR })
  }
}

// Handle GET request to show unsubscribe page
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id: encryptedId } = params

    if (!encryptedId) {
      return NextResponse.redirect('/subscribers/optout/error')
    }

    // Redirect to the unsubscribe page UI
    // The page will handle the actual unsubscribe via POST
    return NextResponse.redirect(`/subscribers/optout/${encryptedId}`)
  } catch (error) {
    console.error('Error handling GET unsubscribe:', error)
    return NextResponse.redirect('/subscribers/optout/error')
  }
}
