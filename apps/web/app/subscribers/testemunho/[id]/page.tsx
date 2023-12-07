'use server'
import { getDecryptedId } from 'app/api/getDecryptedId'
import { getSupabaseClient } from 'db'
import { TestimonialForm } from './TestimonialForm'

type PageProps = { params: { id: string } }

const getSubscriberEmail = async (userId: string) => {
  const supabase = getSupabaseClient()
  const { data, error } = await supabase
    .from('Subscribers')
    .select('email')
    .eq('id', userId)

  if (error) {
    throw new Error(error.message, { cause: error })
  }
  return data[0].email
}

export default async function TestimonialsPage({ params }: PageProps) {
  const subscriberId = getDecryptedId(params.id)
  const email = await getSubscriberEmail(subscriberId)

  return (
    <section className="grid flex-1 place-content-center">
      <TestimonialForm email={email} />
    </section>
  )
}
