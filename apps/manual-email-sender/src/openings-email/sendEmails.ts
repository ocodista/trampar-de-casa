/* eslint-disable no-console */
import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
import { Entities } from 'shared'
import path from 'path'
import { readFileSync } from 'fs'
import { openingsEmailHTML } from 'shared/src/email/openings-email/OpeningsEmail'
import { emailPropsByDate } from './Emails'
import { getSelectedDate } from '../utils'
import { sendEmailsInBatch } from '../emailSender'

dotenv.config()

const SUPABASE_URL = process.env['SUPABASE_URL'] || ''
const SUPABASE_KEY = process.env['SUPABASE_KEY'] || ''

const confirmedSubscribers = async () => {
  const supabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY)
  const { data, error } = await supabaseClient
    .from(Entities.Subcribers)
    .select('*')
    .eq('isConfirmed', 'TRUE')
  if (error) throw error
  return data
}

async function confirmedSubscribersToSend(emailsSent: string[]) {
  const result = await confirmedSubscribers()
  return result.filter((subscriber) => !emailsSent.includes(subscriber.email))
}

async function main() {
  const selectedDate = getSelectedDate()
  console.log(`Searching email props for ${selectedDate}...`)

  const emailProps = emailPropsByDate[selectedDate]
  if (!emailProps) {
    console.log(
      `Props for ${selectedDate} not found, please check Emails.ts file!`
    )
    process.exit(1)
  }

  const { globalOpenings, localOpenings } = emailProps.openings
  const emailHTML = openingsEmailHTML({
    globalOpenings,
    localOpenings,
    feedbackFormUrl: emailProps.feedbackForm,
  })
  const successEmailsPath = path.resolve(
    __dirname,
    `./${selectedDate}/sent-emails.txt`
  )
  const emailsSent = readFileSync(successEmailsPath, 'utf8').split('\n')
  const subscribers = await confirmedSubscribersToSend(emailsSent)
  const emails = subscribers.map((s) => s.email)
  await sendEmailsInBatch({
    emails: ['caiohoborghi@gmail.com'] || emails,
    html: emailHTML,
    subject: `${
      globalOpenings.length + localOpenings.length
    } vagas para você Trampar de Casa 🔥`,
  })
}

main().catch(console.error)
