import { FormSchema } from 'app/(roles)/formSchema'
import { getPostgresClient } from 'db'
import { StatusCodes } from 'http-status-codes'

const db = getPostgresClient()

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

  const existingRecommendations =
    await db.getRolesRecommendationByTitleAndCompany(body.title, body.company)
  if (existingRecommendations.length > 0) {
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

  await db.insertRoleRecommendation({
    minimumYears: insertData.minimum_years,
    topicId: insertData.topic_id,
    company: insertData.company,
    country: insertData.country,
    currency: insertData.currency,
    description: insertData.description,
    language: insertData.language,
    salary: insertData.salary,
    title: insertData.title,
    url: insertData.url,
  })
  return new Response(null, { status: StatusCodes.OK })
}
