'use server'

import { redirect } from 'next/navigation'
import { Resend } from 'resend'
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
  const resendKey = process.env['RESEND_KEY']
  if (!resendKey) {
    throw new Error('[ENV NOT FOUND] resend key is not configured')
  }
  const ownerEmail = process.env['OWNER_EMAIL']
  if (!ownerEmail)
    throw new Error('[ENV NOT FOUND] Owner Email is not configured')
  const resend = new Resend(resendKey)
  resend.emails.send({
    from: 'logger@trampardecasa.com.br',
    subject: '[Trampar de Casa] New hire!',
    to: ownerEmail,
    text: `User ${email} got a new job!`,
  })
}
