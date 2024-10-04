import { createClient } from '@supabase/supabase-js'
import { Filter } from 'app/components/SelectInput'
const SUPABASE_URL = 'https://aimnpbxmfrpbkvyjyosi.supabase.co'
const SUPABASE_SERVICE_ROLE =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFpbW5wYnhtZnJwYmt2eWp5b3NpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjA1NTY0NDQsImV4cCI6MjAzNjEzMjQ0NH0.9FXhvGFKgp8749B7jCqi_PpLdGdgbtLgZymk7NPxq3E'

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE)

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

    return {
      data: data || [],
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
