import { useState, useCallback } from 'react'
import { updateSearchParams } from 'app/utils/updateSearchParams'
import { useRouter } from 'next/navigation'
import { fetchJobs } from '../action'
import type { Filter } from '../../../components/SelectInput'

export const useJobFilters = () => {
  const [filters, setFilters] = useState<Filter[]>([])
  const router = useRouter()

  const handleAddFilter = useCallback(
    async (newFilter: Filter) => {
      const updatedFilters = filters.filter(
        (f) => f.inputType !== newFilter.inputType
      )
      updatedFilters.push(newFilter)
      setFilters(updatedFilters)

      const { data } = await fetchJobs(undefined, updatedFilters, [])
      const newQueryString = updateSearchParams(updatedFilters)
      router.push(`?${newQueryString}`, { scroll: false })

      return data
    },
    [filters, router]
  )

  const handleDeleteFilter = useCallback(
    async (filterToDelete: Filter) => {
      const updatedFilters = filters.filter(
        (f) => f.option !== filterToDelete.option
      )
      setFilters(updatedFilters)

      const { data } = await fetchJobs(undefined, updatedFilters, [])
      const newQueryString = updateSearchParams(updatedFilters)
      router.push(`?${newQueryString}`, { scroll: false })

      return data
    },
    [filters, router]
  )

  const deleteAllFilters = useCallback(async () => {
    setFilters([])
    const { data } = await fetchJobs(undefined, [], [])
    router.push('', { scroll: false })
    return data
  }, [router])

  const extractFiltersFromURL = useCallback(() => {
    const searchParams = new URLSearchParams(window.location.search)
    const newFilters: Filter[] = []

    for (const [key, value] of searchParams) {
      const values = value.split(' ')
      newFilters.push(
        ...values.map((val) => ({
          inputType: key,
          option: { value: val, label: val },
        }))
      )
    }

    return newFilters
  }, [])

  return {
    filters,
    setFilters,
    handleAddFilter,
    handleDeleteFilter,
    deleteAllFilters,
    extractFiltersFromURL,
  }
}
