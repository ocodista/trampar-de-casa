'use server'

import { getSupabaseClient } from 'db'
import { SupabaseTable } from 'db/src/supabase/utilityTypes'
import { redirect } from 'next/navigation'
import { Resend } from 'resend'
import { z } from 'zod'
import { Fields } from './Fields'

const testimonialSchema = z.object({
  company: z.string(),
  details: z.string(),
  email: z.string(),
  role: z.string(),
  skills: z.array(z.string()),
})
type TestimonialTable = SupabaseTable<'testimonial'>
export async function saveTestimonial(email: string, formData: FormData) {
  const payloadObj: Partial<Record<keyof TestimonialTable, unknown>> = {
    company: formData.get(Fields.Company)?.toString(),
    details: formData.get(Fields.Testimonial)?.toString(),
    email,
    skills: formData.get(Fields.Skills)?.toString().split(','),
    role: formData.get(Fields.Role)?.toString(),
  }
  const testimonialFields = testimonialSchema.parse(payloadObj)
  const supabase = getSupabaseClient()
  const { data, error } = await supabase
    .from('testimonial')
    .insert(testimonialFields)

  if (error) throw new Error(error.message, { cause: error })

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
