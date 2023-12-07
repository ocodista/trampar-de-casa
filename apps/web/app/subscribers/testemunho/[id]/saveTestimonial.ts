'use server'

import { getSupabaseClient } from 'db'
import { SupabaseTable } from 'db/src/supabase/utilityTypes'
import { redirect } from 'next/navigation'
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
export async function saveTestimonial(formData: FormData) {
  console.log(formData, Fields.Email)
  const payloadObj: Partial<Record<keyof TestimonialTable, unknown>> = {
    company: formData.get(Fields.Company)?.toString(),
    details: formData.get(Fields.Testimonial)?.toString(),
    email: formData.get(Fields.Email)?.toString(),
    skills: formData.get(Fields.Skills)?.toString().split(','),
    role: formData.get(Fields.Role)?.toString(),
  }
  const testimonialFields = testimonialSchema.parse(payloadObj)
  const supabase = getSupabaseClient()
  const { data, error } = await supabase
    .from('testimonial')
    .insert(testimonialFields)

  if (error) throw new Error(error.message, { cause: error })

  console.log(data)
  redirect('?success')
}
