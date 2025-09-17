import { getPostgresClient } from 'db'
import { SESClient, SendRawEmailCommand } from '@aws-sdk/client-ses'

const db = getPostgresClient()
const CRON_SECRET = process.env.CRON_SECRET
const OWNER_EMAIL = process.env.OWNER_EMAIL

export const GET = async (request: Request) => {
  const authHeader = request.headers.get('authorization')
  if (authHeader !== `Bearer ${CRON_SECRET}`) {
    return new Response('Unauthorized', {
      status: 401,
    })
  }

  const count = await db.getRolesRecommendationCount()
  if (count === 0) return new Response()

  const sesClient = new SESClient({
    region: process.env.AWS_REGION || 'us-east-1',
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
  })

  const from = 'Trampar de Casa <logger@trampardecasa.com.br>'
  const subject = 'Verifique as sugestões de vagas'
  const text = 'Acesse a tabela "rolesRecommendation" e valide as vagas.'

  const rawEmailParts = [
    `From: ${from}`,
    `To: ${OWNER_EMAIL}`,
    `Subject: ${subject}`,
    `MIME-Version: 1.0`,
    `Content-Type: text/plain; charset=UTF-8`,
    '',
    text,
  ]

  const rawEmail = rawEmailParts.join('\r\n')

  const sendEmailCommand = new SendRawEmailCommand({
    RawMessage: {
      Data: Buffer.from(rawEmail),
    },
    Tags: [
      {
        Name: 'EmailType',
        Value: 'notification',
      },
      {
        Name: 'Environment',
        Value: process.env.NODE_ENV || 'production',
      },
    ],
  })

  await sesClient.send(sendEmailCommand)
  return Response.json({ success: true })
}
