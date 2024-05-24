/* eslint-disable no-console */
import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
import fs, { readFileSync } from 'fs'
import path from 'path'
import { Entities } from 'shared'
import { sendConfirmationEmail } from 'shared/src/email'

dotenv.config()

const SUPABASE_URL = process.env['SUPABASE_URL'] || ''
const SUPABASE_KEY = process.env['SUPABASE_KEY'] || ''

const getUnconfirmedSubscribers = async () => {
  const supabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY)
  const { data, error } = await supabaseClient
    .from(Entities.Subscribers)
    .select('*')
    .eq('isConfirmed', 'FALSE')
  if (error) throw error
  return data
}

async function getUnconfirmedNotSentSubscribers(emailsSent: string[]) {
  const confirmedSubscribers = await getUnconfirmedSubscribers()
  return confirmedSubscribers.filter(
    (subscriber) => !emailsSent.includes(subscriber.email)
  )
}

async function sendEmail(id: string, email: string) {
  const handleError = (err: unknown) => {
    console.error(`Error sending to: ${email}`, err)
    fs.appendFileSync(
      path.resolve(__dirname, './error-emails.txt'),
      `${email}\n`
    )
  }

  try {
    await sendConfirmationEmail({
      resendKey: process.env['RESEND_KEY'] || '',
      secretKey: process.env['CRYPT_SECRET'] || '',
      to: email,
      subscriberId: id,
    })
    fs.appendFileSync(
      path.resolve(__dirname, './success-emails.txt'),
      `${email}\n`
    )
    console.log(`Successfully sent to: ${email}`)
  } catch (err) {
    handleError(err)
  }
}

async function main() {
  const successEmailsPath = path.resolve(__dirname, './success-emails.txt')
  const emailsSent = readFileSync(successEmailsPath, 'utf8').split('\n')
  const unconfirmedUsers = await getUnconfirmedNotSentSubscribers(emailsSent)
  let i = 1
  let promises: Promise<void>[] = []
  for (const user of unconfirmedUsers) {
    console.log(`[${i++}/${unconfirmedUsers.length}]`)
    promises.push(sendEmail(user.id, user.email))
    if (i % 25 === 0) {
      console.log('Esperando pelo envio de emails...')
      await Promise.all(promises)
      console.log('Esperando 1s...\n\n')
      await new Promise((r) => setTimeout(r, 1000))
      promises = []
    }
  }
  console.log('Esperando pelo último envio de emails...')
  await Promise.all(promises)
}

main().catch(console.error)
