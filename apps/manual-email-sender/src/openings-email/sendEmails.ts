/* eslint-disable no-console */
import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
import { Entities } from 'shared'
import { openingEmailHTML } from '../../../../packages/shared/src/email/openings-email/28-06-2023/OpeningEmail'
import { Resend } from 'resend'
import path from 'path'
import { readFileSync } from 'fs'
import fs from 'fs'

dotenv.config()

const SUPABASE_URL = process.env['SUPABASE_URL'] || ''
const SUPABASE_KEY = process.env['SUPABASE_KEY'] || ''

const sentFileName = './sent-emails-28-06-2023.txt'

const getConfirmedSubscribers = async () => {
  const supabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY)
  const { data, error } = await supabaseClient
    .from(Entities.Subcribers)
    .select('*')
    .eq('isConfirmed', 'TRUE')
  if (error) throw error
  return data
}

async function getConfirmedNotSentSubscribers(emailsSent: string[]) {
  const confirmedSubscribers = await getConfirmedSubscribers()
  return confirmedSubscribers.filter(
    (subscriber) => !emailsSent.includes(subscriber.email)
  )
}

const sendEmail = async (resend: Resend, email: string) => {
  const handleError = (err: unknown) => {
    console.error(`Error sending to: ${email}`, err)
    fs.appendFileSync(
      path.resolve(__dirname, './error-emails.txt'),
      `${email}\n`
    )
  }

  const emailHTML = openingEmailHTML
  try {
    console.log(`Sending to ${email}...`)
    const response = await resend.emails.send({
      from: 'comece@trampardecasa.com.br (Trampar de Casa)',
      to: email,
      subject: '25 vagas para você Trampar de Casa 🔥',
      html: emailHTML,
    })
    if (!response) {
      handleError('Response is null')
      return
    }
    console.log(`Successfully sent to ${email}!`)
    fs.appendFileSync(path.resolve(__dirname, sentFileName), `${email}\n`)
  } catch (err) {
    handleError(err)
    console.log(err)
  }
}

const batchSend = async (emails: string[]) => {
  let i = 1
  let promises: Promise<void>[] = []
  const resend = new Resend(process.env['RESEND_KEY'])
  for (const email of emails) {
    console.log(`[${i++}/${emails.length}]`)
    promises.push(sendEmail(resend, email))
    if (i % 10 === 0) {
      console.log(
        `Waiting for [${i / 10}/${emails.length / 10}] round to finish...`
      )
      await Promise.all(promises)
      console.log('Waiting 1s...')
      await new Promise((r) => setTimeout(r, 1_000))
      promises = []
    }
  }

  if (promises.length) {
    console.log('Sending remaining emails...', promises.length)
    await Promise.all(promises)
  }
  console.log('Batch send finished!')
}

async function main() {
  const successEmailsPath = path.resolve(__dirname, sentFileName)
  const emailsSent = readFileSync(successEmailsPath, 'utf8').split('\n')
  const subscribers = await getConfirmedNotSentSubscribers(emailsSent)
  const emails = subscribers.map((s) => s.email)
  await batchSend(emails)
}

main().catch(console.error)
