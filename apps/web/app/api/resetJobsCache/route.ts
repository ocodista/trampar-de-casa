import { getPostgresClient } from 'db'
import { StatusCodes } from 'http-status-codes'

const db = getPostgresClient()

export const POST = async (req: Request) => {
  const authHeader = req.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response('Unauthorized', { status: StatusCodes.UNAUTHORIZED })
  }

  await db.getRoles()
  return new Response(null, { status: StatusCodes.OK })
}
