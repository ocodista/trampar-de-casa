'use server'

import { Database, getSupabaseClient } from 'db'
import { RolesPage } from './RolesPage'
import { fetchJobs } from './action'
import getRedisClient from 'app/utils/getRedisClient'

const ONE_DAY_IN_MINUTES = 86_400

type Job = Database['public']['Tables']['Roles']['Row']
type Skill = Database['public']['Views']['vw_skills_in_roles']['Row']
type Country = Database['public']['Views']['vw_countries_in_roles']['Row']

async function getJobs(): Promise<Job[]> {
  try {
    const client = await getRedisClient()
    const jobsFromCache = await client.get('web_jobs')
    if (jobsFromCache) {
      await client.quit()
      console.log('cache')
      return JSON.parse(jobsFromCache) as Job[]
    }

    const { data: jobs } = await fetchJobs([])
    console.log('supabase')

    await client.set('web_jobs', JSON.stringify(jobs), {
      EX: ONE_DAY_IN_MINUTES,
    })
    await client.quit()
    return jobs as Job[]
  } catch (error) {
    console.error('Failed to fetch jobs:', error)
    return []
  }
}

async function getSkills(): Promise<Skill[]> {
  try {
    const client = await getRedisClient()
    const skillsFromCache = await client.get('Skills')
    if (skillsFromCache) {
      await client.quit()
      return JSON.parse(skillsFromCache) as Skill[]
    }

    const supabase = getSupabaseClient()
    const { data: skills } = await supabase
      .from('vw_skills_in_roles')
      .select('*')
      .order('name')

    await client.set('getSkills', JSON.stringify(skills), {
      EX: ONE_DAY_IN_MINUTES,
    })
    await client.quit()
    return skills as Skill[]
  } catch (error) {
    console.error('Failed to fetch skills:', error)
    return []
  }
}

async function getCountries(): Promise<Country[]> {
  try {
    const supabase = getSupabaseClient()
    const { data: countries } = await supabase
      .from('vw_countries_in_roles')
      .select('*')
      .order('country')
    return countries as Country[]
  } catch (error) {
    console.error('Failed to fetch countries:', error)
    return []
  }
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
