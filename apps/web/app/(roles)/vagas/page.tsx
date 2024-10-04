import { RolesPage } from './RolesPage'
import { createClient } from '@supabase/supabase-js'
import { createClient as createClientRedis } from 'redis'
import { fetchJobs } from './action'

export const revalidate = 0

const ONE_DAY_IN_MINUTES = 86_400

const client = createClientRedis({
  socket: {
    host: process.env['REDIS_HOST'],
    port: parseInt(process.env['REDIS_PORT'] || '6379'),
  },
})

client.connect()

const supabase = createClient(
  process.env['SUPABASE_URL'] as string,
  process.env['SUPABASE_SERVICE_ROLE'] as string
)

async function getJobs() {
  const jobsFromCache = await client.get('web_jobs')

  if (jobsFromCache) {
    return JSON.parse(jobsFromCache)
  }

  const result = await fetchJobs('initial', [], [])

  if (result.isSuccess && result.data) {
    await client.set('web_jobs', JSON.stringify(result.data), {
      EX: ONE_DAY_IN_MINUTES,
    })
    return result.data
  } else {
    console.error('Failed to fetch jobs:', result.message)
    return []
  }
}

async function getSkills() {
  const skillsFromCache = await client.get('Skills')

  if (skillsFromCache) {
    return JSON.parse(skillsFromCache)
  }

  const { data: skills } = await supabase
    .from('vw_skills_in_roles')
    .select('*')
    .order('name')

  await client.set('getSkills', JSON.stringify(skills), {
    EX: ONE_DAY_IN_MINUTES,
  })

  return skills
}

async function getCountries() {
  const { data: countries } = await supabase
    .from('vw_countries_in_roles')
    .select('*')
    .order('country')

  return countries
}

export default async function Page() {
  const skills = await getSkills()
  const jobs = await getJobs()
  const countries = await getCountries()

  return (
    <RolesPage
      jobsFromServer={jobs}
      skillsFromServer={skills}
      countries={countries}
    />
  )
}
