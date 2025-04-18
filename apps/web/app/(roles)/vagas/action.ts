'use server'

import { getPostgresClient } from 'db'
import { Role } from 'db/src/types'

export interface SelectOption {
  value: string | number
  label: string
  emoji?: string
}

export interface Filter {
  option: SelectOption
  inputType: string
}

// For compatibility with existing components
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

// Added Job interface to maintain the structure expected by components
export interface Job {
  id: string
  title: string
  description: string
  language: string
  country: string
  salary: string
  skillsId: string[] | null
  minimumYears: number | null
  company: string | null
  currency: string | null
  url: string | null
  createdAt: Date
  updatedAt: Date
  ready: boolean
}

export const getFilterFromPreferences = async (
  email: string
): Promise<JobFilterResult> => {
  const db = getPostgresClient()
  const skillsId = await db.getSubscriberSkillsId(email)
  return { skillsId }
}

export const fetchJobs = async (
  filtersOrJobFilter: Filter[] | JobFilter = []
): Promise<{
  jobs: Job[]
  totalJobs: number
}> => {
  try {
    const db = getPostgresClient()

    // Check if the parameter is a Filter array or a JobFilter object
    const isFilterArray = Array.isArray(filtersOrJobFilter)

    let countryValues: string[] = []
    let skillsId: number[] = []
    let description: string[] = []
    let order = { field: 'salary' as string, ascending: false }

    if (isFilterArray) {
      // Handle Filter array
      const filters = filtersOrJobFilter as Filter[]

      const countryFilters = filters.filter((f) => f.inputType === 'country')
      const skillFilters = filters.filter((f) => f.inputType === 'skill')
      const levelFilters = filters.filter((f) => f.inputType === 'level')
      const orderFilter = filters.find((f) => f.inputType === 'order')

      if (countryFilters.length > 0) {
        countryValues = countryFilters.map((f) => f.option.value as string)
        if (countryValues.includes('Global')) {
          countryValues.push('International')
        }
      }

      if (skillFilters.length > 0) {
        skillsId = skillFilters
          .map((f) => {
            const value = f.option.value
            return typeof value === 'string' ? parseInt(value, 10) : value
          })
          .filter((id): id is number => !isNaN(id))
      }

      if (levelFilters.length > 0) {
        description = levelFilters.map((f) => f.option.value as string)
      }

      if (orderFilter) {
        order = {
          field: 'createdAt',
          ascending: orderFilter.option.value === 'ascending',
        }
      }
    } else {
      // Handle JobFilter object
      const jobFilter = filtersOrJobFilter as JobFilter
      countryValues = jobFilter.country || []
      skillsId = jobFilter.skillsId || []
      description = jobFilter.description || []
      order = jobFilter.order || { field: 'salary', ascending: false }
    }

    const { data: roles, count } = await db.getRolesWithFilters({
      country: countryValues.length > 0 ? countryValues : undefined,
      skillsId: skillsId.length > 0 ? skillsId : undefined,
      description: description.length > 0 ? description : undefined,
      order,
    })

    // Transform the roles to maintain the original job structure
    const jobs = roles.map((role) => ({
      id: role.id,
      title: role.title,
      description: role.description,
      language: role.language,
      country: role.country,
      salary: role.salary,
      skillsId: role.topicId ? [role.topicId.toString()] : null,
      minimumYears: role.minimumYears || null,
      company: role.company || null,
      currency: role.currency || null,
      url: role.url || null,
      createdAt: new Date(role.createdAt),
      updatedAt: new Date(role.updatedAt),
      ready: true,
    }))

    return {
      jobs,
      totalJobs: count,
    }
  } catch (error) {
    console.error('Error fetching jobs:', error)
    return {
      jobs: [],
      totalJobs: 0,
    }
  }
}
