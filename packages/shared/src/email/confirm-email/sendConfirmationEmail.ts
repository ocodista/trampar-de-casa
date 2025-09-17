import { SESClient, SendRawEmailCommand } from '@aws-sdk/client-ses'
import { confirmationEmailHTML } from './htmlTemplate'

interface SendConfirmationEmail {
  secretKey: string
  to: string
  subscriberId: string
}

export const sendConfirmationEmail = async ({
  secretKey,
  to,
  subscriberId,
}: SendConfirmationEmail): Promise<void> => {
  const sesClient = new SESClient({
    region: process.env.AWS_REGION || 'us-east-1',
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
  })

  const emailHTML = confirmationEmailHTML({ subscriberId, secretKey })
  const from = 'Trampar de Casa <comece@trampardecasa.com.br>'
  const subject = '🚀 Ative sua Conta - Confirmação de Email Necessária'

  // Build raw email with proper headers
  const rawEmailParts = [
    `From: ${from}`,
    `To: ${to}`,
    `Subject: ${subject}`,
    `MIME-Version: 1.0`,
    `Content-Type: text/html; charset=UTF-8`,
    '',
    emailHTML,
  ]

  const rawEmail = rawEmailParts.join('\r\n')

  const sendEmailCommand = new SendRawEmailCommand({
    RawMessage: {
      Data: Buffer.from(rawEmail),
    },
    Tags: [
      {
        Name: 'EmailType',
        Value: 'confirmation',
      },
      {
        Name: 'Environment',
        Value: process.env.NODE_ENV || 'production',
      },
    ],
  })

  await sesClient.send(sendEmailCommand)
}
