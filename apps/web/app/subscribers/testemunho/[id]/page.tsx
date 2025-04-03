'use server'
import { getDecryptedId } from 'app/api/getDecryptedId'
import { getPostgresClient } from 'db'
import { TestimonialForm } from './TestimonialForm'
import { ToastContainer } from './ToastContainer'

type PageProps = { params: { id: string } }

const Typography = {
  h1: 'scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl',
  p: 'leading-7 [&:not(:first-child)]:mt-6',
}

const db = getPostgresClient()

const getSubscriberEmail = async (id: string) => {
  const result = await db.query<{ email: string }>(
    `SELECT email FROM "Subscribers" WHERE id = $1`,
    [id]
  )
  return result.rows[0]?.email
}

export default async function TestimonialsPage({ params }: PageProps) {
  const subscriberId = getDecryptedId(params.id)
  const email = await getSubscriberEmail(subscriberId)

  return (
    <section className="container mt-5 flex-1 space-y-5 lg:mx-auto">
      <section>
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
