'use server'

import { encrypt } from 'shared'
import { sendProfileEmail } from 'shared/src/email/sendProfileEmail'
import { getPostgresClient } from 'db'

const db = getPostgresClient()

export const getSubscriberByEmail = async (email: string) => {
  return db.getSubscriberByEmail(email)
}

export async function encryptId(id: string) {
  const secretKey = process.env['CRYPT_SECRET'] || ''
  return encrypt(secretKey, id)
}

export async function login(email: string) {
  const subscriber = await getSubscriberByEmail(email)
  if (!subscriber) {
    throw new Error('Subscriber not found')
  }

  await sendProfileEmail(subscriber)
  return subscriber
}

export async function sendEditPreferencesEmail(email: string, id: string) {
  try {
    await sendProfileEmail({ email, id })
  } catch (error) {
    console.error('Erro ao enviar e-mail de preferências:', error)
    throw error
  }
}
