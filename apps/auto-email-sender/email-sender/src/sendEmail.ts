import fs from 'node:fs'
import path from 'path'
import { Resend } from 'resend'

const logSuccessfully = (email: string) => {
  console.log(`Successfully sent to ${email}!`)
  fs.appendFileSync(
    path.resolve(__dirname, `./openings-email/sent-emails.txt`),
    `${email}\n`
  )
}

const logFailure = (email: string, error: unknown) => {
  console.error(`Error sending to: ${email}`, error)
  fs.appendFileSync(
    path.resolve(__dirname, `./openings-email/failed-emails.txt`),
    `${email}\n`
  )
}

export const sendEmail = async (
  emails: Resend['emails'],
  email: string,
  html: string,
  title: string
) => {
  try {
    await emails.send({
      from: 'Trampar de Casa <comece@trampardecasa.com.br>',
      to: email,
      subject: title,
      html,
    })
    logSuccessfully(email)
  } catch (error) {
    logFailure(email, error)
  }
}
