'use server'

import { getPostgresClient } from 'db'
import { Role } from 'db/src/types'

interface JobFilter {
  country?: Array<string>
  skillsId?: Array<number>
  description?: Array<string>
  order?: {
    field: string
    ascending: boolean
  }
}

interface JobFilterResult {
  skillsId: Array<string>
}

export const getFilterFromPreferences = async (
  email: string
): Promise<JobFilterResult> => {
  const db = getPostgresClient()
  const skillsId = await db.getSubscriberSkillsId(email)
  return { skillsId }
}

const filterJobData = (job: Role, filters: JobFilter): boolean => {
  if (filters.country?.length && !filters.country.includes(job.country))
    return false
  if (filters.skillsId?.length) {
    const hasAllSkills = filters.skillsId.includes(job.topicId)
    if (!hasAllSkills) return false
  }
  if (filters.description?.length) {
    const hasDescription = filters.description.some((desc) =>
      job.description.toLowerCase().includes(desc.toLowerCase())
    )
    if (!hasDescription) return false
  }
  return true
}

const sortJobsBySalary = (jobs: Array<Role>): Array<Role> => {
  return jobs.sort((a, b) => Number(b.salary) - Number(a.salary))
}

export const fetchJobs = async (filters?: JobFilter): Promise<Array<Role>> => {
  try {
    const db = getPostgresClient()
    const { data: jobs } = await db.getRolesWithFilters(filters)
    const filteredJobs = jobs.filter((job) => filterJobData(job, filters))
    return sortJobsBySalary(filteredJobs)
  } catch (error) {
    console.error('Error fetching jobs:', error)
    return []
  }
}
