/* eslint-disable no-console */
import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
dotenv.config()

import { ApiRoutes, Entities, UiRoutes, encrypt } from 'shared'
import path from 'path'
import { readFileSync } from 'fs'
import { openingsEmailHTML } from 'shared/src/email/openings-email/OpeningsEmail'
import { OpeningsEmail, emailPropsByDate } from './Emails'
import { getSelectedDate } from '../utils'
import { sendEmail } from '../emailSender'
import { Subscribers } from '../../../web/prisma/client/index'
import { Resend } from 'resend'

const confirmedSubscribers = async () => {
  const SUPABASE_URL = process.env['SUPABASE_URL'] || ''
  const SUPABASE_KEY = process.env['SUPABASE_KEY'] || ''
  console.log('URL', SUPABASE_URL)
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

const emailHTML = (
  secretKey: string,
  id: string,
  emailProps: OpeningsEmail
) => {
  const {
    openings: { localOpenings, globalOpenings },
  } = emailProps
  return openingsEmailHTML({
    globalOpenings,
    localOpenings,
    feedbackFormUrl: emailProps.feedbackForm,
    unsubscribeUrl: `https://trampardecasa.com.br${
      UiRoutes.OptOut
    }/?id=${encrypt(secretKey, id)}`,
  })
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
  const successEmailsPath = path.resolve(
    __dirname,
    `./${selectedDate}/sent-emails.txt`
  )
  const emailsSent = readFileSync(successEmailsPath, 'utf8').split('\n')
  const isMocked = true
  const subscribers = await confirmedSubscribersToSend(emailsSent)
  subscribers.filter((subscribers) => {
    if (isMocked) return subscribers.email === 'caiohoborghi@gmail.com'
    return true
  })
  const chunks = chunkArray(subscribers, 10)
  const subject = `${
    globalOpenings.length + localOpenings.length
  } vagas para você Trampar de Casa 🔥`

  const secretKey = process.env['CRYPT_SECRET'] as string
  if (!secretKey) throw new Error('Secret is needed!')
  const resendClient = new Resend(process.env['RESEND_KEY'])
  for (const [index, chunk] of chunks.entries()) {
    console.log('\n\nStarted!!!')
    const promises = chunk.map((subscriber) =>
      sendEmail({
        to: subscriber.email,
        resendClient,
        html: emailHTML(secretKey, subscriber.id, emailProps),
        subject,
      })
    )
    console.log(`\nWaiting for ${index + 1}/${chunks.length} chunk...`)
    await Promise.allSettled(promises)
    console.log('Finished!')
  }
}

main().catch(console.error)
