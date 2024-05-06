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
import { createClient } from '@supabase/supabase-js'

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
    value: 'Estados Unidos',
    label: '🇺🇸 Estados Unidos',
  },
  {
    value: 'Reino Unido',
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

const supabase = createClient(
  process.env['NEXT_PUBLIC_SUPABASE_URL'] as string,
  process.env['NEXT_PUBLIC_SUPABASE_ANON_KEY'] as string
)

export const RolesPage = ({ jobsFromProps, skillsFromServer }) => {
  const [jobs, setJobs] = useState(jobsFromProps)
  const [skillsFromProps, setSkillsFromProps] = useState(skillsFromServer)
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
  const [preventFirstFetch, setPreventFirstFetch] = useState(true)

  useEffect(() => {
    setSkillsFromProps(skillsFromServer)
    console.log('Atualizou o skillsFromProps')
  }, [skillsFromServer])

  const removeDuplicatesByNormalizedProperty = skillsFromProps.filter(
    (value, index, self) =>
      index === self.findIndex((t) => t.normalized === value.normalized)
  )

  const technologies = removeDuplicatesByNormalizedProperty.map((tech) => {
    return {
      value: tech.id,
      label: tech.name,
      emoji: tech.emoji,
    }
  })

  const handleDeleteFilter = ({ filter }: { filter: Filter }) => {
    const updatedFilters = filters.filter(
      (item) => item.option !== filter.option
    )
    setFilters(updatedFilters)
    fetchJobs(undefined, filters, jobs)
    setHasMore(true)
  }

  const handleOrder = (option: SelectOption) => {
    setOrderButtonValue(option.value)
    setShowOrder(false)
    if (previewOrderValue) {
      const newFilterArray = filters.filter(
        (value) => value.option.value !== previewOrderValue
      )
      setFilters([...newFilterArray, { option: option, inputType: 'order' }])
      setPreviewOrderValue(option.value)
      return
    }
    setFilters((prevState: Filter[]) => [
      { option: option, inputType: 'order' },
      ...prevState,
    ])
    setPreviewOrderValue(option.value)
  }

  useEffect(() => {
    if (preventFirstFetch) {
      setPreventFirstFetch(false)
      return
    }
    const fetchJobsFiltered = async () => {
      try {
        const { data, count } = await fetchJobs(undefined, filters, jobs)
        setTotalJobs(count)
        data.length > 10 ? setHasMore(true) : setHasMore(false)
        setJobs(data)
      } catch (error) {
        console.error('Error fetching filtered jobs:', error.message)
      }
    }

    fetchJobsFiltered()
  }, [filters])

  const refetch = async () => {
    try {
      const { data } = await fetchJobs('refetch', filters, jobs)
      setJobs((prevJobs) => [...prevJobs, ...data])
      data.length > 10 ? setHasMore(true) : setHasMore(false)
    } catch (error) {
      console.error('Error fetching filtered jobs:', error.message)
    }
  }

  const memoInputWithUseTyped = useMemo(
    () => (
      <InputWithUseTyped
        options={technologies}
        filters={filters}
        setFilters={setFilters}
        filterType="skill"
        placeholder="Digite..."
      />
    ),
    []
  )

  return (
    <>
      <FocusBanner />
      <div className="container mx-auto">
        <div className="my-[35px] flex flex-col items-center justify-center text-center text-[48px]">
          <h1>
            Encontre vagas remotas
            <br /> feitas para você
          </h1>
          <div className="relative">{memoInputWithUseTyped}</div>
        </div>
        <div className="mb-[150px]">
          <div className="w-full">
            <div className="flex justify-between">
              <div className="flex gap-[20px]">
                <SelectInput
                  placeholder="🔎  Área"
                  options={technologies}
                  setFilters={setFilters}
                  filterType="skill"
                  filters={filters}
                />
                <SelectInput
                  placeholder="🌎  Local"
                  options={flags}
                  setFilters={setFilters}
                  filterType="country"
                  filters={filters}
                />
                <SelectInput
                  placeholder="🚀  Níveis"
                  options={experienceLevels}
                  setFilters={setFilters}
                  filterType="level"
                  filters={filters}
                />
              </div>
              <div className="relative flex items-center">
                <input
                  readOnly
                  placeholder={
                    orderOptions.find((or) => or.value === orderButtonValue)
                      .label
                  }
                  className="text-baseline border-box z-[2] w-[250px] rounded-[20px] border-[1px] bg-transparent 
                  py-[9px] pl-[14px] pr-[9px] placeholder-black placeholder-opacity-100"
                  onFocus={() => setShowOrder(true)}
                  onBlur={() => {
                    setTimeout(() => setShowOrder(false), 100)
                  }}
                />
                <ChevronDown className="z-1 absolute right-[10px]" />
                {showOrder && (
                  <div
                    className={`absolute right-0 top-[47px] z-10 max-h-[500px] w-[300px] overflow-y-auto rounded-[12px] bg-[#f4f4f5] p-[7px]`}
                  >
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
            <div className="flex gap-[15px]">
              {filters.map((filter) => (
                <div
                  key={filter.option.value}
                  className={`border-box relative mt-[15px] flex items-center 
                  rounded-[20px] border-[1px] bg-[#F4F4F5] py-[7px] pl-[7px] 
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
                    onClick={() => {
                      setFilters([])
                      setHasMore(true)
                      fetchJobs(undefined, filters, jobs)
                    }}
                    className="border-box relative mt-[15px] flex items-center rounded-[20px] border-[1px] border-[#FF0000] bg-[#F4F4F5] py-[7px] pl-[7px] pr-[7px] text-center text-[#FF0000] hover:bg-[#FF0000] hover:text-white"
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
                skillsFromProps={skillsFromProps}
              />
            ))}
          </InfiniteScroll>
        </div>
      </div>
    </>
  )
}
