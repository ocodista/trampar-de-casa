'use server'
import { getDecryptedId } from 'app/api/getDecryptedId'
import { getSupabaseClient } from 'db'
import { TestimonialForm } from './TestimonialForm'
import { ToastContainer } from './ToastContainer'

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
  if (!data.length) throw new Error('Link inválido, usuário não encontrado')
  return data[0].email
}

const Typography = {
  h1: 'scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl',
  p: 'leading-7 [&:not(:first-child)]:mt-6',
}

export default async function TestimonialsPage({ params }: PageProps) {
  const subscriberId = getDecryptedId(params.id)
  const email = await getSubscriberEmail(subscriberId)

  return (
    <section className="container mt-5 flex-1 space-y-5 lg:mx-auto">
      <section className="">
        <h1 className={Typography.h1}>Fui contratado</h1>
        <p className={Typography.p}>
          Ficamos felizes em te ajudar a encontrar a vaga ideal!
          <br />
          Que tal nos explicar mais sobre como foi?
        </p>
      </section>
      <TestimonialForm email={email} />
      <ToastContainer />
    </section>
  )
}
