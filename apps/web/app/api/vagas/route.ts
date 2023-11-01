import { NextResponse } from 'next/server'
import { GetOpeningsParams, getOpenings } from './getOpenings'

enum FilterParams {
  skills = 'skills',
  country = 'country',
  language = 'language',
}

const getFilterParams = (url: URL) => {
  const skills = url.searchParams.get(FilterParams.skills)
  const country = url.searchParams.get(FilterParams.country)
  const language = url.searchParams.get(FilterParams.language)

  return {
    skills,
    country,
    language,
  }
}

export const GET = async (request: Request) => {
  const url = new URL(request.url)
  const props = getFilterParams(url)

  return NextResponse.json(
    await getOpenings(props as unknown as GetOpeningsParams)
  )
}
