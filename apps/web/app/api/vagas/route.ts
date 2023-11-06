import { NextResponse } from 'next/server'
import { GetRolesParams, getRoles } from './getRoles'
import { getRolesPageLength } from './getRolesPageLength'

enum FilterParams {
  skills = 'skills',
  country = 'country',
  language = 'language',
  page = 'page',
  query = 'query',
}

const getFilterParams = (url: URL) => {
  const skills = url.searchParams.get(FilterParams.skills)
  const country = url.searchParams.get(FilterParams.country)
  const language = url.searchParams.get(FilterParams.language)
  const page = url.searchParams.get(FilterParams.page)
  const query = url.searchParams.get(FilterParams.query)

  return {
    skills,
    country,
    language,
    page,
    query,
  }
}

export const GET = async (request: Request) => {
  const url = new URL(request.url)
  const props = getFilterParams(url)

  return NextResponse.json({
    roles: await getRoles(props as unknown as GetRolesParams),
    totalPages: await getRolesPageLength(props as unknown as GetRolesParams),
  })
}
