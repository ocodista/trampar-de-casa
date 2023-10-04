/* eslint-disable no-console */
import dotenv from 'dotenv'
import { Resend } from 'resend'
import { sendEmail } from '../emailSender'
import { getSelectedDate } from '../utils'
import { chunkArray } from '../utils/chunkArray'
import { confirmedSubscribers } from '../utils/confirmedSubscribers'
import { createUnsubscribeLink } from '../utils/createUnsubscribeLink'
import { generateSubjectEmail } from '../utils/generateSubjectEmail'
import { getEmailsSent } from '../utils/getEmailsSent'
import { getOpeningsByDate } from '../utils/getOpeningsByDate'
import { loadSubscribersHtml } from '../utils/loadSubscribersHtml'
dotenv.config()

async function confirmedSubscribersToSend(emailsSent: string[]) {
  const result = await confirmedSubscribers()
  return result.filter((subscriber) => !emailsSent.includes(subscriber.email))
}

async function main() {
  const selectedDate = getSelectedDate()
  console.log(`Searching email props for ${selectedDate}...`)

  const emailProps = getOpeningsByDate(selectedDate)

  const emailsSent = getEmailsSent(selectedDate)
  const subscribers = await confirmedSubscribersToSend(emailsSent)

  const chunks = chunkArray(subscribers, 25)
  const subject = generateSubjectEmail(emailProps)

  const secretKey = process.env['CRYPT_SECRET'] as string
  if (!secretKey) throw new Error('Secret is needed!')

  const resendClient = new Resend(process.env['RESEND_KEY'])

  for (const [index, chunk] of chunks.entries()) {
    console.time(`[${index}] - load htmls`)
    const emailsHTML = await loadSubscribersHtml(secretKey, chunk, emailProps)
    console.timeEnd(`[${index}] - load htmls`)
    const promises = chunk.map(async (subscriber) => {
      await sendEmail({
        to: subscriber.email,
        resendClient,
        subject,
        html: emailsHTML[subscriber.id],
        unsubscribeLink: createUnsubscribeLink(secretKey, subscriber.id),
      })
    })
    console.log(`\nWaiting for ${index + 1}/${chunks.length} chunk...`)
    await Promise.all(promises)
    console.log('\n\n')
  }
  console.log('Finished sending all emails!')
}

main().catch(console.error)
