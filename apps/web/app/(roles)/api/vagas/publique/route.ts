import { FormSchema } from 'app/(roles)/formSchema'
import { getSupabaseClient } from 'db'
import { StatusCodes } from 'http-status-codes'

export const POST = async (req: Request) => {
  const body = (await req.json()) as FormSchema
  const supabaseClient = getSupabaseClient()

  const persistedData = await supabaseClient
    .from('rolesRecommendation')
    .select('id')
    .eq('title', body.title)
    .eq('company', body.company)
  if (persistedData.data.length) {
    return new Response('Esta vaga já esta cadastrada', {
      status: StatusCodes.BAD_REQUEST,
    })
  }

  const { error } = await supabaseClient.from('rolesRecommendation').insert({
    minimum_years: Number(body.minimumYears),
    topic_id: Number(body.topicsId),
    company: body.company,
    country: body.country,
    currency: body.currency,
    description: body.description,
    language: body.language,
    salary: Number(body.salary),
    title: body.title,
    url: body.url,
  })

  if (error) throw error

  return new Response(null, { status: StatusCodes.OK })
}
