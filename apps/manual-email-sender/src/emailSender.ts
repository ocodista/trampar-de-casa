import { Resend } from 'resend'
import { getSelectedDate } from './utils'
import fs from 'fs'
import path from 'path'

export interface SendEmail {
  resendClient: Resend
  to: string
  html: string
  subject: string
}

export const sendEmail = async ({
  resendClient,
  to,
  html,
  subject,
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
    console.log(`Sending to ${to}...`)
    const response = await resendClient.emails.send({
      from: 'comece@trampardecasa.com.br (Trampar de Casa)',
      to,
      subject,
      html,
    })
    if (!response) {
      handleError('Response is null')
      return
    }
    console.log(`Successfully sent to ${to}!`)
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
