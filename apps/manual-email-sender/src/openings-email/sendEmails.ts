/* eslint-disable no-console */
import { createClient } from '@supabase/supabase-js'
import { Subscribers } from 'db'
import dotenv from 'dotenv'
import { readFileSync } from 'fs'
import path from 'path'
import { Resend } from 'resend'
import { Entities, UiRoutes, encrypt } from 'shared'
import { openingsEmailHTML } from 'shared/src/email/openings-email/OpeningsEmail'
import { sendEmail } from '../emailSender'
import { getSelectedDate } from '../utils'
import { OpeningsEmail, emailPropsByDate } from './Emails'

dotenv.config()

const confirmedSubscribers = async () => {
  const SUPABASE_URL = process.env['SUPABASE_URL'] || ''
  const SUPABASE_KEY = process.env['SUPABASE_SERVICE_ROLE'] || ''
  const supabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY)
  const { data, error } = await supabaseClient
    .from(Entities.Subcribers)
    .select('*')
    .eq('isConfirmed', 'TRUE')
  if (error) throw error
  return data as Subscribers[]
}

async function confirmedSubscribersToSend(emailsSent: string[]) {
  const result = await confirmedSubscribers()
  return result.filter((subscriber) => !emailsSent.includes(subscriber.email))
}

function chunkArray<T>(array: T[], size: number): T[][] {
  return Array.from({ length: Math.ceil(array.length / size) }, (_, index) =>
    array.slice(index * size, index * size + size)
  )
}
const createUnsubscribeLink = (secretKey: string, id: string) =>
  `https://trampardecasa.com.br${UiRoutes.OptOut}/?id=${encrypt(secretKey, id)}`
const emailHTML = async (
  secretKey: string,
  id: string,
  emailProps: OpeningsEmail
) => {
  const {
    openings: { localOpenings, globalOpenings },
  } = emailProps
  return await openingsEmailHTML({
    id,
    globalOpenings,
    localOpenings,
    feedbackFormUrl: emailProps.feedbackForm,
    unsubscribeUrl: createUnsubscribeLink(secretKey, id),
  })
}

// TODO: Render OpeningsEmail once, passing static props (globalOpenings, localOpenings, feedbackFormUrl)
// TODO: Generate subscriberHTMLS, should be a Record<id, html>, replacing {{ UNSUBSCRIBE_ID }} param with optout + encrypted id
// TODO: Use subscriberHTMLS to send emails
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
  const successEmailsPath = path.resolve(
    __dirname,
    `./${selectedDate}/sent-emails.txt`
  )
  const emailsSent = readFileSync(successEmailsPath, 'utf8').split('\n')
  const subscribers = await confirmedSubscribersToSend(emailsSent)

  const chunks = chunkArray(subscribers, 10)
  const subject = `🔥 ${
    globalOpenings.length + localOpenings.length
  } vagas para você Trampar de Casa`

  const secretKey = process.env['SECRET_KEY'] as string
  if (!secretKey) throw new Error('Secret is needed!')

  const resendClient = new Resend(process.env['RESEND_KEY'])

  for (const [index, chunk] of chunks.entries()) {
    console.time('batch')
    const promises = chunk.map(async (subscriber) => {
      await sendEmail({
        to: subscriber.email,
        resendClient,
        subject,
        html: await emailHTML(secretKey, subscriber.id, emailProps),
        unsubscribeLink: createUnsubscribeLink(secretKey, subscriber.id),
      })
    })
    console.log(`\nWaiting for ${index + 1}/${chunks.length} chunk...`)
    await Promise.all(promises)
    console.log('\n\n')
    console.timeEnd('batch')
  }
  console.log('Finished sending all emails!')
}

main().catch(console.error)
