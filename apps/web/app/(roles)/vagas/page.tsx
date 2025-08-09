'use server'

import { Database, getPostgresClient } from 'db'
import { RolesPage } from './RolesPage'
import { fetchJobs, Job } from './action'
import { getRedisClient } from '../../utils/getRedisClient'
import { Role } from 'db/src/types'

const ONE_DAY_IN_MINUTES = 86_400

type Skill = Database['public']['Views']['vw_skills_in_roles']['Row']
type Country = Database['public']['Views']['vw_countries_in_roles']['Row']

async function getJobs(): Promise<Job[]> {
  try {
    const client = await getRedisClient()
    const jobsFromCache = await client.get('web_jobs')
    if (jobsFromCache) {
      await client.quit()
      return JSON.parse(jobsFromCache) as Job[]
    }

    const { jobs } = await fetchJobs([])

    await client.set('web_jobs', JSON.stringify(jobs), {
      EX: ONE_DAY_IN_MINUTES,
    })
    await client.quit()
    return jobs
  } catch (error) {
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

    await client.set('Skills', JSON.stringify(skills), {
      EX: ONE_DAY_IN_MINUTES,
    })
    await client.quit()
    return skills as Skill[]
  } catch (error) {
    return []
  }
}

async function getCountries(): Promise<Country[]> {
  try {
    const client = await getRedisClient()
    const countriesFromCache = await client.get('Countries')
    if (countriesFromCache) {
      await client.quit()
      return JSON.parse(countriesFromCache) as Country[]
    }

    const postgres = getPostgresClient()
    const countries = await postgres.getCountriesInRoles()

    await client.set('Countries', JSON.stringify(countries), {
      EX: ONE_DAY_IN_MINUTES,
    })
    await client.quit()
    return countries as Country[]
  } catch (error) {
    return []
  }
}

export default async function Page() {
  const skillsPromise = getSkills()
  const jobsPromise = getJobs()
  const countriesPromise = getCountries()

  const [skills, jobs, countries] = await Promise.all([
    skillsPromise,
    jobsPromise,
    countriesPromise,
  ])

  return (
    <RolesPage
      jobsFromServer={jobs}
      skillsFromServer={skills}
      countries={countries}
    />
  )
}
