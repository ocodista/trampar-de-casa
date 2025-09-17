'use server'

import { redirect } from 'next/navigation'
import { SESClient, SendRawEmailCommand } from '@aws-sdk/client-ses'
import { z } from 'zod'
import { Fields } from './Fields'
import { getPostgresClient } from 'db'

const testimonialSchema = z.object({
  company: z.string(),
  details: z.string(),
  email: z.string(),
  role: z.string(),
  skills: z.array(z.string()),
})

const db = getPostgresClient()

export const insertTestimonial = async (
  subscriberId: string,
  testimonial: string
) => {
  await db.query(
    `INSERT INTO "Testimonials" ("subscriberId", testimonial) VALUES ($1, $2)`,
    [subscriberId, testimonial]
  )
}

export async function saveTestimonial(email: string, formData: FormData) {
  const testimonialFields = testimonialSchema.parse({
    company: formData.get(Fields.Company),
    details: formData.get(Fields.Testimonial),
    email: formData.get(Fields.Email),
    role: formData.get(Fields.Role),
    skills: formData.getAll(Fields.Skills),
  }) as {
    company: string
    details: string
    email: string
    role: string
    skills: string[]
  }

  try {
    await insertTestimonial(testimonialFields.email, testimonialFields.details)
  } catch (error) {
    throw new Error('Failed to save testimonial', { cause: error })
  }

  await sendEmailLogger(email)
  redirect('?success')
}

const sendEmailLogger = async (email: string) => {
  const ownerEmail = process.env['OWNER_EMAIL']
  if (!ownerEmail)
    throw new Error('[ENV NOT FOUND] Owner Email is not configured')

  const sesClient = new SESClient({
    region: process.env.AWS_REGION || 'us-east-1',
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
  })

  const from = 'logger@trampardecasa.com.br'
  const subject = '[Trampar de Casa] New hire!'
  const text = `User ${email} got a new job!`

  const rawEmailParts = [
    `From: ${from}`,
    `To: ${ownerEmail}`,
    `Subject: ${subject}`,
    `MIME-Version: 1.0`,
    `Content-Type: text/plain; charset=UTF-8`,
    '',
    text,
  ]

  const rawEmail = rawEmailParts.join('\r\n')

  const sendEmailCommand = new SendRawEmailCommand({
    RawMessage: {
      Data: Buffer.from(rawEmail),
    },
    Tags: [
      {
        Name: 'EmailType',
        Value: 'notification',
      },
      {
        Name: 'Environment',
        Value: process.env.NODE_ENV || 'production',
      },
    ],
  })

  await sesClient.send(sendEmailCommand)
}
