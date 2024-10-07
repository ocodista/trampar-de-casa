'use server'

import { RolesPage } from './RolesPage'
import { createClient } from '@supabase/supabase-js'
import { createClient as createClientRedis } from 'redis'
import { fetchJobs } from './action'

const ONE_DAY_IN_MINUTES = 86_400

async function getRedisClient() {
  const client = createClientRedis({
    socket: {
      host: process.env['REDIS_HOST'],
      port: parseInt(process.env['REDIS_PORT'] || '6379'),
    },
  })
  await client.connect()
  return client
}

function getSupabaseClient() {
  return createClient(
    process.env['SUPABASE_URL'] as string,
    process.env['SUPABASE_SERVICE_ROLE'] as string
  )
}

async function getJobs() {
  const client = await getRedisClient()

  try {
    const jobsFromCache = await client.get('web_jobs')
    if (jobsFromCache) {
      return JSON.parse(jobsFromCache)
    }

    const { data: jobs } = await fetchJobs([])

    await client.set('web_jobs', JSON.stringify(jobs), {
      EX: ONE_DAY_IN_MINUTES,
    })
    return jobs
  } finally {
    await client.quit()
  }
}

async function getSkills() {
  const client = await getRedisClient()
  const supabase = getSupabaseClient()

  try {
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
  } finally {
    await client.quit()
  }
}

async function getCountries() {
  const supabase = getSupabaseClient()
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
