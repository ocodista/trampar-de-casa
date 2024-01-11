'use server'
import Form from './Form'
import { PreviewNextWeekEmail } from './PreviewNextWeekEmail'

export default async function Page() {
  return (
    <section className="container mx-auto space-y-2">
      <h1 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        Email da semana
      </h1>
      <section className="grid xl:grid-cols-2">
        <Form />
        <PreviewNextWeekEmail />
      </section>
    </section>
  )
}
