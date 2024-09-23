import { useState, useCallback } from 'react'
import { fetchJobs } from '../action'

export const useJobSearch = (initialJobs) => {
  const [jobs, setJobs] = useState(initialJobs)
  const [hasMore, setHasMore] = useState(true)
  const [totalJobs, setTotalJobs] = useState<number>()

  const refetchJobs = useCallback(async () => {
    try {
      const { data } = await fetchJobs('refetch', [], jobs)
      setJobs((prevJobs) => [...prevJobs, ...data])
      setHasMore(data.length > 0)
    } catch (error) {
      console.error('Error fetching jobs:', error.message)
    }
  }, [jobs])

  return {
    jobs,
    setJobs,
    hasMore,
    setHasMore,
    totalJobs,
    setTotalJobs,
    refetchJobs,
  }
}
