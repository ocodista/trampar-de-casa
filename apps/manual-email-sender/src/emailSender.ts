import { Resend } from 'resend'
import { getSelectedDate, sleep } from './utils'
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

interface SendEmailInBatch {
  emails: string[]
  html: string
  size?: number
  intervalInMs?: number
  subject: string
}

export const sendEmailsInBatch = async ({
  emails,
  html,
  size = 10,
  intervalInMs = 1_000,
  subject,
}: SendEmailInBatch) => {
  let i = 1
  let promises: Promise<void>[] = []
  const resendClient = new Resend(process.env['RESEND_KEY'])
  for (const email of emails) {
    promises.push(sendEmail({ resendClient, to: email, html, subject }))
    console.log(`[${i++}/${emails.length}]`)
    const isEndOfBatch = i % size === 0
    if (isEndOfBatch) {
      console.log(
        `Waiting for [${i / size}/${emails.length / size}] round to finish...`
      )
      await Promise.all(promises)
      await sleep(intervalInMs)
      promises = []
    }
  }

  if (promises.length) {
    console.log('Sending remaining emails...', promises.length)
    await Promise.all(promises)
  }
  console.log('Batch send finished!')
}
