'use server'

import { getSupabaseClient } from 'db'
import { Filter } from 'app/components/SelectInput'

interface ItemExtracted {
  option: {
    value: string | number
    label: string
  }
  inputType: string
}

const getFilter = (filters: Filter[], filterType: string) => {
  return filters.filter(
    (filter: ItemExtracted) => filter.inputType === filterType
  )
}

const supabase = getSupabaseClient()

export const getFilterFromPreferences = async (email: string) => {
  const { data } = await supabase
    .from('Subscribers')
    .select('skillsId')
    .eq('email', email)

  return data
}

export const fetchJobs = async (
  filters: Filter[]
): Promise<{
  data: any[]
  isSuccess: boolean
  message: string
  count: number
}> => {
  try {
    const countryOptionsFormatted = getFilter(filters, 'country')
    const skillsFormatted = getFilter(filters, 'skill')
    const levelsFormated = getFilter(filters, 'level')
    const orderFilter = filters.find((filter) => filter.inputType === 'order')

    let query = supabase
      .from('Roles')
      .select('*', { count: 'exact' })
      .eq('ready', true)

    if (countryOptionsFormatted.length > 0) {
      const countryValues = countryOptionsFormatted.map(
        (country: ItemExtracted) => country.option.value as string
      )
      if (countryValues.includes('Global')) {
        countryValues.push('International')
      }
      query = query.in('country', countryValues)
    }

    if (skillsFormatted.length > 0) {
      const skillsId = skillsFormatted
        .map((skill: ItemExtracted) => {
          const value = skill.option.value
          return typeof value === 'string' ? parseInt(value, 10) : value
        })
        .filter((id): id is number => !isNaN(id))

      if (skillsId.length > 0) {
        query = query.contains('skillsId', skillsId)
      }
    }

    if (levelsFormated.length > 0) {
      const filters = levelsFormated.map(
        (level: ItemExtracted) => `description.ilike.%${level.option.value}%`
      )
      const combinedFilter = filters.join(',')
      query = query.or(combinedFilter)
    }

    if (orderFilter) {
      const orderOption = getFilter(filters, 'order')
      query = query.order('createdAt', {
        ascending: orderOption[0].option.value === 'ascending',
      })
    } else {
      query = query.order('salary', { nullsFirst: false })
    }

    const { data, count, error } = await query

    if (error) {
      throw error
    }

    const sortedData = data?.sort((a, b) => {
      const parseSalary = (salary: string) => {
        if (!salary) return 0
        const cleanedSalary = salary.replace(/[^0-9.-]+/g, '')
        return parseFloat(cleanedSalary) || 0
      }

      const salaryA = parseSalary(a.salary)
      const salaryB = parseSalary(b.salary)

      if (salaryA === null || salaryA === undefined) return 1
      if (salaryB === null || salaryB === undefined) return -1
      return salaryB - salaryA
    })

    return {
      data: sortedData || [],
      isSuccess: true,
      message: '',
      count: count || 0,
    }
  } catch (error) {
    console.error('Erro ao buscar dados do banco de dados:', error)
    return {
      data: [],
      isSuccess: false,
      message: error.message || 'Um erro ocorreu ao buscar os dados',
      count: 0,
    }
  }
}

export const createRole = async (roleData: any) => {
  const { data, error } = await supabase
    .from('Roles')
    .insert(roleData)
    .select()
    .single()

  if (error) throw error
  return data
}

export const createRoleOwner = async (roleID: string, subscriberID: string) => {
  const { error } = await supabase.from('RoleOwner').insert({
    roleID,
    subscriberID,
  })

  if (error) throw error
}
