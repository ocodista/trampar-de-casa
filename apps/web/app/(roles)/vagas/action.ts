'use server'
import { createClient } from '@supabase/supabase-js'
import { Filter, Job, SelectOption } from 'app/components/SelectInput'

const supabase = createClient(
  process.env['SUPABASE_URL'] as string,
  process.env['SUPABASE_SERVICE_ROLE'] as string
)

interface ItemExtracted {
  option: {
    value: string
    label: string
  }
  inputType: string
}

const getFilter = (filters: Filter[], filterType: string) => {
  return filters.filter(
    (filter: ItemExtracted) => filter.inputType === filterType
  )
}

export const fetchJobs = async (
  type: string,
  filters: { option: SelectOption; inputType: string }[],
  jobs: Job[]
): Promise<{
  data: Job[]
  isSuccess: boolean
  message: string
  count: any
  type: string
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
      .limit(21)

    if (countryOptionsFormatted.length > 0) {
      const countryValues = countryOptionsFormatted.map(
        (country: ItemExtracted) => country.option.value
      )
      query = query.in('country', countryValues)
    }

    if (skillsFormatted.length > 0) {
      const skillsId = skillsFormatted.map(
        (skill: ItemExtracted) => skill.option.value
      )
      query = query.contains('skillsId', skillsId)
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
      query = query.order('createdAt', { ascending: true })
    }

    if (type === 'refetch') {
      query = query.range(jobs.length, jobs.length + 10)
    }

    const { data, count, error } = await query

    return { data, isSuccess: true, message: '', count, type }
  } catch (error) {
    console.error('Erro ao buscar dados do banco de dados:', error.message)
    return {
      data: [],
      isSuccess: false,
      message: error.message,
      count: 0,
      type,
    }
  }
}
