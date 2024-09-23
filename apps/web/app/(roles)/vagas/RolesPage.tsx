'use client'

import { FocusBanner } from 'app/landing-page/FocusBanner'
import { X } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import JobCard from '../../components/ui/JobCard'
import InputWithUseTyped from 'app/components/InputWithUseTyped'
import InfiniteScroll from 'react-infinite-scroll-component'
import SelectInput from 'app/components/SelectInput'
import { fetchJobs, getFilterFromPreferences } from './action'
import { useRouter } from 'next/navigation'
import { updateSearchParams } from 'app/utils/updateSearchParams'
import { useJobFilters } from './hooks/useJobsFilter'
import { useJobSearch } from './hooks/useJobSearch'
import { FilterTag } from './components/FilterTag'
import { OrderSelect } from './components/OrderSelect'
import { experienceLevels, flags, orderOptions } from './constants'

export const RolesPage = ({ jobsFromServer, skillsFromServer }) => {
  const router = useRouter()
  const {
    filters,
    setFilters,
    handleAddFilter,
    handleDeleteFilter,
    deleteAllFilters,
    extractFiltersFromURL,
  } = useJobFilters()

  const {
    jobs,
    setJobs,
    hasMore,
    setHasMore,
    totalJobs,
    setTotalJobs,
    refetchJobs,
  } = useJobSearch(jobsFromServer)

  const [hasPreferences, setHasPreferences] = useState(false)

  const technologies = useMemo(
    () =>
      skillsFromServer.map((tech) => ({
        value: tech.id,
        label: tech.name,
        emoji: tech.emoji,
      })),
    [skillsFromServer]
  )

  const handleFilterByPreferences = async () => {
    try {
      const email = localStorage.getItem('loginEmail')
      const skillsFromPreferences = await getFilterFromPreferences(email)

      const formattedSkills = skillsFromPreferences.flatMap((item) =>
        item.skillsId.map((skillId) => ({
          inputType: 'skill',
          option: {
            value: skillId,
            label: getLabel('skill', skillId),
          },
        }))
      )

      const { data, count } = await fetchJobs(undefined, formattedSkills, [])
      setFilters(formattedSkills)
      setJobs(data)
      setTotalJobs(count)
      setHasMore(data.length > 10)
      const newQueryString = updateSearchParams(formattedSkills)
      router.push(`?${newQueryString}`, { scroll: false })
    } catch (error) {
      console.error('Error fetching jobs based on preferences:', error.message)
    }
  }

  useEffect(() => {
    const fetchInitialJobs = async (initialFilters) => {
      try {
        const { data, count } = await fetchJobs(undefined, initialFilters, [])
        setJobs(data)
        setTotalJobs(count)
        setHasMore(data.length > 10)
      } catch (error) {
        console.error('Error fetching initial jobs:', error.message)
      }
    }

    const initialFilters = extractFiltersFromURL()
    if (initialFilters.length > 0) {
      setFilters(initialFilters)
      fetchInitialJobs(initialFilters)
    }

    setHasPreferences(!!localStorage.getItem('loginEmail'))
  }, [extractFiltersFromURL, setHasMore, setTotalJobs, setFilters, setJobs])

  const memoInputWithUseTyped = useMemo(
    () => (
      <InputWithUseTyped
        options={technologies}
        filters={filters}
        setFilters={setFilters}
        filterType="skill"
        placeholder="Digite..."
        setTotalJobs={setTotalJobs}
        jobs={jobs}
        setJobs={setJobs}
        setHasMore={setHasMore}
      />
    ),
    [filters, technologies, jobs]
  )

  return (
    <>
      <FocusBanner />
      <div className="container mx-auto">
        <div className="my-[35px] flex flex-col items-center justify-center text-center text-[25px] sm:text-[35px] md:text-[48px] lg:text-[48px]">
          <h1>
            Encontre vagas remotas
            <br /> feitas para você
          </h1>
          <div className="relative">{memoInputWithUseTyped}</div>
        </div>
        <div className="mb-[150px]">
          <div className="flex flex-col gap-3">
            <div className="flex flex-col justify-between gap-2 md:flex-row lg:flex-row">
              <div className="flex w-full flex-wrap justify-start gap-2 md:gap-5 lg:gap-5">
                <SelectInput
                  placeholder="🔎  Área"
                  options={technologies}
                  setFilters={setFilters}
                  filterType="skill"
                  filters={filters}
                  setTotalJobs={setTotalJobs}
                  jobs={jobs}
                  setJobs={setJobs}
                  setHasMore={setHasMore}
                />
                <SelectInput
                  placeholder="🌎  Local"
                  options={flags}
                  setFilters={setFilters}
                  filterType="country"
                  filters={filters}
                  setTotalJobs={setTotalJobs}
                  jobs={jobs}
                  setJobs={setJobs}
                  setHasMore={setHasMore}
                />
                <SelectInput
                  placeholder="🚀  Níveis"
                  options={experienceLevels}
                  setFilters={setFilters}
                  filterType="level"
                  filters={filters}
                  setTotalJobs={setTotalJobs}
                  jobs={jobs}
                  setJobs={setJobs}
                  setHasMore={setHasMore}
                />
              </div>
              <OrderSelect
                options={orderOptions}
                onOrderChange={handleAddFilter}
              />
            </div>
            {hasPreferences && (
              <div className="flex items-center justify-start">
                <button
                  onClick={handleFilterByPreferences}
                  className="border-box xs:w-[150px] w-full rounded-2xl border bg-transparent py-[9px] pl-2 pr-2 placeholder-black placeholder-opacity-100 sm:w-[150px] md:w-[150px] lg:w-[150px]"
                >
                  ⭐ Preferências
                </button>
              </div>
            )}
            <div className="flex gap-[15px]">
              {filters.map((filter) => (
                <FilterTag
                  key={filter.option.value}
                  filter={filter}
                  onDelete={handleDeleteFilter}
                />
              ))}
              {filters.length > 0 && (
                <button
                  onClick={deleteAllFilters}
                  className="border-box relative mt-[15px] flex items-center rounded-2xl border-[1px] border-[#FF0000] bg-[#F4F4F5] py-[7px] pl-[7px] pr-[7px] text-center text-[#FF0000] hover:bg-[#FF0000] hover:text-white"
                >
                  <X />
                  <p>Limpar {totalJobs} resultados</p>
                </button>
              )}
            </div>
          </div>
          <InfiniteScroll
            dataLength={jobs.length}
            next={refetchJobs}
            hasMore={hasMore}
            loader={
              <h4 className="mt-[10px] text-center">Carregando vagas...</h4>
            }
            endMessage={
              <p className="mt-[10px] text-center">
                🚀 Todas as vagas foram carregadas! Explore e encontre a sua
                oportunidade.
              </p>
            }
            style={{
              marginTop: '25px',
              display: 'flex',
              width: '100%',
              flexDirection: 'column',
              gap: '10px',
              overflowY: 'hidden',
              padding: '10px',
            }}
          >
            {jobs.map((job, index) => (
              <JobCard
                job={job}
                key={index}
                skillsFromProps={skillsFromServer}
              />
            ))}
          </InfiniteScroll>
        </div>
      </div>
    </>
  )
}
