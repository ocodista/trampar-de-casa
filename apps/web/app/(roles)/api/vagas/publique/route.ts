import { FormSchema } from 'app/(roles)/formSchema'
import { getSupabaseClient } from 'db'
import { StatusCodes } from 'http-status-codes'

interface RoleRecommendationInsert {
  minimum_years: number
  topic_id: number
  company: string
  country: string
  currency: string
  description: string
  language: 'English' | 'Portuguese'
  salary: number
  title: string
  url: string
}

export const POST = async (req: Request) => {
  const body = (await req.json()) as FormSchema
  const supabaseClient = getSupabaseClient()

  const persistedData = await supabaseClient
    .from('rolesRecommendation')
    .select('id')
    .eq('title', body.title)
    .eq('company', body.company)
  if (persistedData.data && persistedData.data.length > 0) {
    return new Response('Esta vaga já esta cadastrada', {
      status: StatusCodes.BAD_REQUEST,
    })
  }

  const insertData: RoleRecommendationInsert = {
    minimum_years: Number(body.minimumYears),
    topic_id: Number(body.topicsId),
    company: body.company,
    country: body.country,
    currency: body.currency,
    description: body.description,
    language: body.language as 'English' | 'Portuguese',
    salary: Number(body.salary),
    title: body.title,
    url: body.url,
  }

  const { error } = await supabaseClient
    .from('rolesRecommendation')
    .insert(insertData)

  if (error) throw error

  return new Response(null, { status: StatusCodes.OK })
}
