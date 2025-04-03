'use server'

import { getPostgresClient } from 'db'
import { Role } from 'db/src/types'

interface JobFilter {
  country?: string[]
  skillsId?: number[]
  description?: string[]
  order?: {
    field: string
    ascending: boolean
  }
}

export const getFilterFromPreferences = async (email: string) => {
  const db = getPostgresClient()
  const skillsId = await db.getSubscriberSkillsId(email)
  return skillsId
}

const filterJobData = (job: Role, filters: JobFilter) => {
  if (filters.country && !filters.country.includes(job.country)) return false
  if (filters.skillsId && filters.skillsId.length > 0) {
    const hasAllSkills = filters.skillsId.includes(job.topicId)
    if (!hasAllSkills) return false
  }
  if (filters.description && filters.description.length > 0) {
    const hasDescription = filters.description.some((desc) =>
      job.description.toLowerCase().includes(desc.toLowerCase())
    )
    if (!hasDescription) return false
  }
  return true
}

export const fetchJobs = async (filters: JobFilter) => {
  try {
    const db = getPostgresClient()
    const { data: jobs } = await db.getRolesWithFilters(filters)
    const filteredJobs = jobs.filter((job) => filterJobData(job, filters))
    return filteredJobs.sort((a, b) => Number(b.salary) - Number(a.salary))
  } catch (error) {
    console.error('Error fetching jobs:', error)
    return []
  }
}
