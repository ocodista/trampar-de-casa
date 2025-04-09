'use server'

import { Database, getPostgresClient } from 'db'
import { RolesPage } from './RolesPage'
import { fetchJobs } from './action'
import { getRedisClient } from '../../utils/getRedisClient'
import { Role } from 'db/src/types'

const ONE_DAY_IN_MINUTES = 86_400

type Skill = Database['public']['Views']['vw_skills_in_roles']['Row']
type Country = Database['public']['Views']['vw_countries_in_roles']['Row']

async function getJobs(): Promise<Role[]> {
  try {
    const client = await getRedisClient()
    const jobsFromCache = await client.get('web_jobs')
    if (jobsFromCache) {
      await client.quit()
      console.log('cache hit')
      return JSON.parse(jobsFromCache) as Role[]
    }

    const jobs = await fetchJobs()
    console.log('cache miss, fetching from postgres')

    await client.set('web_jobs', JSON.stringify(jobs), {
      EX: ONE_DAY_IN_MINUTES,
    })
    await client.quit()
    return jobs
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

    const postgres = getPostgresClient()
    const skills = await postgres.getSkillsInRoles()

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
    const postgres = getPostgresClient()

    const countries = await postgres.getCountriesInRoles()
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
