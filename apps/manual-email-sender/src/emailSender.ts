import fs from 'fs'
import path from 'path'
import { SESClient, SendRawEmailCommand } from '@aws-sdk/client-ses'
import { getSelectedDate } from './utils'

export interface SendEmail {
  sesClient: SESClient
  to: string
  html: string
  subject: string
  unsubscribeLink: string
}

export const sendEmail = async ({
  sesClient,
  to,
  html,
  subject,
  unsubscribeLink,
}: SendEmail) => {
  const selectedDate = getSelectedDate()
  const handleError = (err: unknown) => {
    console.error(`Error sending to: ${to}`, err)
    fs.appendFileSync(
      path.resolve(
        __dirname,
        `./openings-email/${selectedDate}/failed-emails.txt`
      ),
      `${to}\n`
    )
  }

  try {
    console.log(`Sending to ${to} via AWS SES...`)

    // Build raw email with proper headers
    const rawEmail = [
      `From: Trampar de Casa <comece@trampardecasa.com.br>`,
      `To: ${to}`,
      `Subject: ${subject}`,
      `MIME-Version: 1.0`,
      `Content-Type: text/html; charset=UTF-8`,
      `List-Unsubscribe: <${unsubscribeLink}>`,
      `List-Unsubscribe-Post: List-Unsubscribe=One-Click`,
      ``,
      html,
    ].join('\r\n')

    const sendEmailCommand = new SendRawEmailCommand({
      RawMessage: {
        Data: Buffer.from(rawEmail),
      },
      Tags: [
        {
          Name: 'EmailType',
          Value: 'manual-campaign',
        },
        {
          Name: 'Environment',
          Value: process.env.NODE_ENV || 'production',
        },
      ],
    })

    const response = await sesClient.send(sendEmailCommand)
    if (!response.MessageId) {
      handleError('Response MessageId is null')
      return
    }
    console.log(`Successfully sent to ${to}! Message ID: ${response.MessageId}`)
    fs.appendFileSync(
      path.resolve(
        __dirname,
        `./openings-email/${selectedDate}/sent-emails.txt`
      ),
      `${to}\n`
    )
  } catch (err) {
    handleError(err)
    console.log(err)
  }
}
