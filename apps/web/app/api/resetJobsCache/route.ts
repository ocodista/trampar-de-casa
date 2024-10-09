import { NextResponse } from 'next/server'
import getRedisClient from 'app/utils/getRedisClient'
import { fetchJobs } from 'app/(roles)/vagas/action'

const ONE_DAY_IN_MINUTES = 86_400

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const token = searchParams.get('token')
  if (token !== process.env.SECRET_KEY) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const client = await getRedisClient()

    await client.del('web_jobs')

    const { data: fetchedJobs } = await fetchJobs([])

    await client.set('web_jobs', JSON.stringify(fetchedJobs), {
      EX: ONE_DAY_IN_MINUTES,
    })

    await client.quit()

    return NextResponse.json({
      message: 'Cache reset and refilled successfully',
    })
  } catch (error) {
    console.error('Failed to reset and refill cache:', error)
    return NextResponse.json(
      { error: 'Failed to reset and refill cache' },
      { status: 500 }
    )
  }
}
