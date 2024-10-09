'use server'

import { Database, getSupabaseClient } from 'db'
import { RolesPage } from './RolesPage'
import { fetchJobs } from './action'
import getRedisClient from 'app/utils/getRedisClient'

const ONE_DAY_IN_MINUTES = 86_400

type Job = Database['public']['Tables']['Roles']['Row']

async function getJobs(): Promise<Job[]> {
  try {
    const client = await getRedisClient()
    const jobsFromCache = await client.get('web_jobs')

    let jobs: Job[]
    if (jobsFromCache) {
      jobs = JSON.parse(jobsFromCache) as Job[]
      console.log('cache')
      jobs = jobs.sort((a, b) => {
        const parseSalary = (salary: string | null) => {
          if (!salary) return 0
          const cleanedSalary = salary.replace(/[^0-9.-]+/g, '')
          return parseFloat(cleanedSalary) || 0
        }

        const salaryA = parseSalary(a.salary)
        const salaryB = parseSalary(b.salary)

        if (salaryA === salaryB) return 0
        if (salaryA === 0) return 1
        if (salaryB === 0) return -1
        return salaryB - salaryA
      })
    } else {
      const { data: fetchedJobs } = await fetchJobs([])
      jobs = fetchedJobs as Job[]

      await client.set('web_jobs', JSON.stringify(jobs), {
        EX: ONE_DAY_IN_MINUTES,
      })
    }

    await client.quit()

    return jobs
  } catch (error) {
    console.error('Failed to fetch jobs:', error)
    return []
  }
}

async function getSkills() {
  try {
    const client = await getRedisClient()
    const skillsFromCache = await client.get('Skills')
    if (skillsFromCache) {
      await client.quit()
      return JSON.parse(skillsFromCache)
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
    return skills
  } catch (error) {
    console.error('Failed to fetch skills:', error)
    return []
  }
}

async function getCountries() {
  try {
    const supabase = getSupabaseClient()
    const { data: countries } = await supabase
      .from('vw_countries_in_roles')
      .select('*')
      .order('country')
    return countries
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
