'use client'
import { FocusBanner } from 'app/landing-page/FocusBanner'
import { ChevronDown, X } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import close from '../../../public/images/close.svg'
import JobCard from '../../components/ui/JobCard'
import InputWithUseTyped from 'app/components/InputWithUseTyped'
import Image from 'next/image'
import InfiniteScroll from 'react-infinite-scroll-component'
import SelectInput, { Filter, SelectOption } from 'app/components/SelectInput'
import { fetchJobs } from './action'
import { useRouter } from 'next/navigation'
import { updateSearchParams } from 'app/utils/updateSearchParams'

const experienceLevels = [
  {
    value: 'Estágio',
    label: '🎓 Estágio',
  },
  {
    value: 'Júnior',
    label: '👶 Júnior',
  },
  {
    value: 'Pleno',
    label: '🧑‍💼 Pleno',
  },
  {
    value: 'Sênior',
    label: '👴 Sênior',
  },
]

const flags = [
  {
    value: 'Brasil',
    label: '🇧🇷 Brasil',
  },
  {
    value: 'EstadosUnidos',
    label: '🇺🇸 Estados Unidos',
  },
  {
    value: 'ReinoUnido',
    label: '🇬🇧 Reino Unido',
  },
]

const orderOptions = [
  {
    value: null,
    label: '🛠️  Ordenar',
  },
  {
    value: 'ascending',
    label: '🕒 Vagas mais recentes',
  },
  {
    value: 'descending',
    label: '🕒 Vagas mais antigas',
  },
]

const order = orderOptions.map((or) => or.label)

export const RolesPage = ({ jobsFromServer, skillsFromServer }) => {
  const router = useRouter()
  const [jobs, setJobs] = useState(jobsFromServer)
  const [filters, setFilters] = useState<Filter[]>([])
  const [hasMore, setHasMore] = useState(true)
  const [showOrder, setShowOrder] = useState(false)
  const [totalJobs, setTotalJobs] = useState<number>()
  const [orderButtonValue, setOrderButtonValue] = useState<string | number>(
    null
  )
  const [previewOrderValue, setPreviewOrderValue] = useState<string | number>(
    ''
  )

  const technologies = skillsFromServer.map((tech) => {
    return {
      value: tech.id,
      label: tech.name,
      emoji: tech.emoji,
    }
  })

  const extractFiltersFromURL = () => {
    const searchParams = new URLSearchParams(window.location.search)
    const newFilters: Filter[] = []
    const getLabel = (key, val) => {
      if (key === 'skill') {
        const filtered = technologies.find(
          (tech) => String(tech.value) === String(val)
        )
        return filtered ? filtered.label : val
      }
      if (key === 'country') {
        const filtered = flags.find((flag) => flag.value === val)
        return filtered ? filtered.label : val
      }
      if (key === 'level') {
        const filtered = experienceLevels.find((level) => level.value === val)
        return filtered ? filtered.label : val
      }
      if (key === 'order') {
        const filtered = orderOptions.find((option) => option.value === val)
        return filtered ? filtered.label : val
      }
      return val
    }

    searchParams.forEach((value, key) => {
      const values = value.split(' ')
      values.forEach((val) => {
        newFilters.push({
          inputType: key,
          option: { value: val, label: getLabel(key, val) },
        })
      })
    })

    return newFilters
  }

  const handleOrder = async (option: SelectOption) => {
    setOrderButtonValue(option.value)
    setShowOrder(false)

    let updatedFilters = filters

    if (previewOrderValue) {
      if (previewOrderValue === option.value) {
        return
      }
      updatedFilters = filters.filter(
        (value) => value.option.value !== previewOrderValue
      )
    }

    updatedFilters = [{ option: option, inputType: 'order' }, ...updatedFilters]
    setFilters(updatedFilters)
    setPreviewOrderValue(option.value)

    const { data } = await fetchJobs(undefined, updatedFilters, jobs)
    setJobs(data)
    const newQueryString = updateSearchParams(updatedFilters)
    router.push(`?${newQueryString}`, { scroll: false })
  }

  const deleteSearchParams = (filter) => {
    const searchParams = new URLSearchParams(window.location.search)
    const allValues = searchParams.get(filter.inputType)
    const filterValue = String(filter.option.value)

    const allValuesSplit = allValues ? allValues.split(' ') : []

    const filteredValues = allValuesSplit.filter(
      (value) => value !== filterValue
    )

    if (filteredValues.length === 0) {
      searchParams.delete(filter.inputType)
    } else {
      const filteredValuesString = filteredValues.join(' ')
      searchParams.set(filter.inputType, filteredValuesString)
    }

    return searchParams.toString()
  }

  const handleDeleteFilter = async ({ filter }: { filter: Filter }) => {
    const updatedFilters = filters.filter(
      (item) => item.option !== filter.option
    )
    setFilters(updatedFilters)

    try {
      const { data, count } = await fetchJobs(undefined, updatedFilters, jobs)
      setTotalJobs(count)
      data.length > 10 ? setHasMore(true) : setHasMore(false)
      setJobs(data)
    } catch (error) {
      console.error('Error fetching filtered jobs:', error.message)
    }

    const newQueryString = deleteSearchParams(filter)
    router.push(`?${newQueryString}`, { scroll: false })
  }

  const refetch = async () => {
    try {
      const { data } = await fetchJobs('refetch', filters, jobs)
      setJobs((prevJobs) => [...prevJobs, ...data])
      data.length > 10 ? setHasMore(true) : setHasMore(false)
    } catch (error) {
      console.error('Error fetching filtered jobs:', error.message)
    }
  }

  const deleteAllfilters = async () => {
    setFilters([])
    setHasMore(true)
    const { data } = await fetchJobs(undefined, [], jobs)
    setJobs(data)
    const searchParams = new URLSearchParams(window.location.search)
    searchParams.delete('skill')
    searchParams.delete('country')
    searchParams.delete('level')
    searchParams.delete('order')

    const newQueryString = searchParams.toString()
    router.push(`?${newQueryString}`, { scroll: false })
  }

  useEffect(() => {
    const fetchInitialJobs = async (initialFilters: Filter[]) => {
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
  }, [])

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
    [filters]
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
              <div className="xs:justify-start relative flex items-center justify-center sm:justify-start md:justify-start lg:justify-start">
                <div className="xs:w-auto relative flex w-auto items-center justify-end sm:w-auto md:w-auto lg:w-auto">
                  <input
                    readOnly
                    placeholder={
                      orderOptions.find((or) => or.value === orderButtonValue)
                        .label
                    }
                    className="text-baseline border-box xs:w-[220px] z-[2] w-full rounded-2xl border-[1px] bg-transparent py-[9px] pl-[14px] 
                  pr-[9px] placeholder-black placeholder-opacity-100 sm:w-[220px] md:w-[220px] lg:w-[220px]"
                    onFocus={() => setShowOrder(true)}
                    onBlur={() => {
                      setTimeout(() => setShowOrder(false), 100)
                    }}
                  />
                  <ChevronDown className="z-1 absolute mr-3" />
                </div>
                {showOrder && (
                  <div className="xs:w-[250px] absolute top-[47px] z-10 max-h-[500px] w-full overflow-y-auto rounded-2xl bg-[#f4f4f5] p-[7px] sm:w-[250px] md:w-[250px] lg:w-[250px]">
                    {orderOptions
                      .filter((or) => or.value !== null)
                      .map((option) => (
                        <div
                          key={option.value}
                          className="w-full cursor-pointer p-[7px] hover:bg-gray-200"
                          onClick={() => handleOrder(option)}
                        >
                          {option.label}
                        </div>
                      ))}
                  </div>
                )}
              </div>
            </div>
            <div className="flex items-center justify-start">
              <button
                onClick={() => console.log('teste')}
                className="border-box xs:w-[150px] w-full rounded-2xl border bg-transparent py-[9px] pl-2 pr-2 placeholder-black placeholder-opacity-100 sm:w-[150px] md:w-[150px] lg:w-[150px]"
              >
                ⭐ Preferências
              </button>
            </div>
            <div className="flex gap-[15px]">
              {filters.map((filter) => (
                <div
                  key={filter.option.value}
                  className={`border-box relative mt-[15px] flex items-center 
                  rounded-2xl border-[1px] bg-[#F4F4F5] py-[7px] pl-[7px] 
                  pr-[10px] text-center placeholder-black placeholder-opacity-100 ${
                    order.includes(filter.option.label) && 'hidden'
                  }`}
                >
                  {`${filter.option.emoji ? filter.option.emoji : ''} ${
                    filter.option.label
                  }`}
                  <Image
                    className="ml-[5px] h-[14px] w-[16px] cursor-pointer opacity-50"
                    alt="Close tag"
                    src={close}
                    onClick={() => handleDeleteFilter({ filter })}
                  />
                </div>
              ))}
              {filters.length > 0 &&
                filters.some(
                  (filter) => !order.includes(filter.option.label as string)
                ) && (
                  <button
                    onClick={deleteAllfilters}
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
            next={() => refetch()}
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
