'use client'
import { FocusBanner } from 'app/landing-page/FocusBanner'
import { ChevronDown, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import close from '../../../public/images/close.svg'
import JobCard from '../../components/ui/JobCard'
import { createClient } from '@supabase/supabase-js'
import { skillArray } from '../../../../../packages/shared/src/infos/skills'
import InputWithUseTyped from 'app/components/InputWithUseTyped'
import Image from 'next/image'
import InfiniteScroll from 'react-infinite-scroll-component'
import SelectInput, { Filter, SelectOption } from 'app/components/SelectInput'

const supabase = createClient(
  process.env['NEXT_PUBLIC_SUPABASE_URL'] as string,
  process.env['NEXT_PUBLIC_SUPABASE_ANON_KEY'] as string
)
interface ItemExtracted {
  option: {
    value: string
    label: string
  }
  inputType: string
}

const removeDuplicatesByNormalizedProperty = skillArray.filter(
  (value, index, self) =>
    index === self.findIndex((t) => t.normalized === value.normalized)
)

const technologies = removeDuplicatesByNormalizedProperty.map((tech) => {
  return {
    value: tech.id,
    label: tech.name,
  }
})

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
    label: '📊 Ordenar',
  },
  {
    value: 'ascending',
    label: '🕒 Trabalhos mais recentes',
  },
  {
    value: 'descending',
    label: '🕒 Trabalhos mais antigos',
  },
]

const order = orderOptions.map((or) => or.label)

const RolesPage = () => {
  const [jobs, setJobs] = useState([])
  const [salaryOpen, setSalaryOpen] = useState(false)
  const [rangeValue, setRangeValue] = useState(50)
  const [previewRangeValue, setPreviewRangeValue] = useState<number>(null)
  const [filters, setFilters] = useState<Filter[]>([])
  const [hasMore, setHasMore] = useState(true)
  const [showOrder, setShowOrder] = useState(false)
  const [orderButtonValue, setOrderButtonValue] = useState<string | number>(
    null
  )
  const [previewOrderValue, setPreviewOrderValue] = useState<string | number>(
    ''
  )
  const inputSalaryRef = useRef(null)
  const [totalJobs, setTotalJobs] = useState<number>()

  const getFilter = (filters: Filter[], filterType: string) => {
    return filters.filter(
      (filter: ItemExtracted) => filter.inputType === filterType
    )
  }

  const fetchJobs = async (type: string) => {
    try {
      const countryOptionsFormatted = getFilter(filters, 'country')
      const skillsFormatted = getFilter(filters, 'skill')
      const levelsFormated = getFilter(filters, 'level')
      const orderFilter = filters.find((filter) => filter.inputType === 'order')

      // Contagem total de vagas
      let totalQuery = supabase.from('Roles').select('id')

      if (countryOptionsFormatted.length > 0) {
        const countryValues = countryOptionsFormatted.map(
          (country: ItemExtracted) => country.option.value
        )
        totalQuery = totalQuery.in('country', countryValues)
      }

      if (skillsFormatted.length > 0) {
        const skillsId = skillsFormatted.map(
          (skill: ItemExtracted) => skill.option.value
        )
        totalQuery = totalQuery.contains('skillsId', skillsId)
      }

      if (levelsFormated.length > 0) {
        const filters = levelsFormated.map(
          (level: ItemExtracted) => `description.ilike.%${level.option.value}%`
        )
        const combinedFilter = filters.join(',')
        totalQuery = totalQuery.or(combinedFilter)
      }

      const { data: totalData, error: totalError } = await totalQuery

      if (totalError) {
        throw totalError
      }

      const totalJobs = totalData.length

      // Consulta paginada para obter os dados reais das vagas
      let query = supabase.from('Roles').select('*').limit(21)

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

      const { data, error } = await query

      if (error) {
        throw error
      }

      if (type === 'initial') {
        setJobs(data)
      } else if (type === 'refetch') {
        setJobs((prevJobs) => [...prevJobs, ...data])
      }

      if (data.length < 10) {
        setHasMore(false)
      }
      setTotalJobs(totalJobs)
      console.log(totalJobs)
    } catch (error) {
      console.error('Erro ao buscar dados do banco de dados:', error.message)
    }
  }

  const handleDeleteFilter = ({ filter }: { filter: Filter }) => {
    setFilters((prevFilters) =>
      prevFilters.filter((item) => item.option !== filter.option)
    )

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

  const handleInputRange = () => {
    if (previewRangeValue) {
      const newFilterArray = filters.filter(
        (value) => value.option.value !== previewRangeValue
      )
      setFilters([
        {
          option: {
            value: rangeValue,
            label: `💵 >$${rangeValue}k/y`,
          },
          inputType: 'range',
        },
        ...newFilterArray,
      ])
      setPreviewRangeValue(rangeValue)
      setSalaryOpen(false)
      return
    }
    setFilters((prevState) => [
      {
        option: {
          value: rangeValue,
          label: `💵 >$${rangeValue}k/y`,
        },
        inputType: 'range',
      },
      ...prevState,
    ])
    setPreviewRangeValue(rangeValue)
    setSalaryOpen(false)
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        inputSalaryRef.current &&
        !inputSalaryRef.current.contains(event.target)
      ) {
        setSalaryOpen(false)
      }
    }

    document.addEventListener('click', handleClickOutside)

    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [])

  useEffect(() => {
    fetchJobs('initial')
  }, [filters])

  return (
    <>
      <FocusBanner />
      <div className="md:pt-15 lg:pt-15 container mx-auto sm:pt-16">
        <div>
          <div className="flex flex-col items-center justify-center text-center text-[48px]">
            <h1>
              Encontre uma vaga remota
              <br /> de qualquer lugar
            </h1>
            <div className="relative">
              <InputWithUseTyped
                options={technologies}
                setFilters={setFilters}
                filterType="skill"
                filters={filters}
              />
            </div>
          </div>
        </div>
        <div className="mb-[150px] mt-[35px]">
          <div className="w-full">
            <div className="flex justify-between">
              <div className="flex gap-[20px]">
                <SelectInput
                  placeholder="🔎 Procurar"
                  options={technologies}
                  setFilters={setFilters}
                  filterType="skill"
                  filters={filters}
                />
                <SelectInput
                  placeholder={'🌎 Local'}
                  options={flags}
                  setFilters={setFilters}
                  filterType="country"
                  filters={filters}
                />
                <div
                  className="relative flex items-center"
                  ref={inputSalaryRef}
                >
                  <input
                    readOnly
                    onFocus={() => setSalaryOpen(true)}
                    className="border-box w-[150px] rounded-[20px] border-[1px] bg-[#F4F4F5] py-[9px] pl-[14px] pr-[9px] placeholder-black placeholder-opacity-100"
                    placeholder="💵 Salario"
                  />
                  <ChevronDown className="absolute right-[10px]" />
                  {salaryOpen && (
                    <div className="absolute left-0 top-[40px] z-10 min-w-[250px] rounded-2xl bg-[#f4f4f5] p-[14px]">
                      <div className="flex justify-between">
                        <p>Minimum</p>
                        <p>${rangeValue}k/year</p>
                      </div>
                      <input
                        type="range"
                        value={rangeValue}
                        step={10}
                        className="m-[2px] w-full"
                        min={10}
                        max={100}
                        onMouseUp={() => handleInputRange()}
                        onChange={(e) => {
                          setRangeValue(parseInt(e.target.value))
                        }}
                      />
                    </div>
                  )}
                </div>
                <SelectInput
                  placeholder="🚀 Níveis"
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
                  className="border-box w-[250px] rounded-[20px] border-[1px] bg-[#F4F4F5] py-[9px] pl-[14px] pr-[9px] placeholder-black placeholder-opacity-100"
                  onFocus={() => setShowOrder(true)}
                  onBlur={() => {
                    setTimeout(() => setShowOrder(false), 100)
                  }}
                />
                <ChevronDown className="absolute right-[10px]" />
                {showOrder && (
                  <div
                    className={`absolute right-0 top-[40px] z-10 max-h-[500px] w-[300px] overflow-y-auto rounded-[12px] bg-[#f4f4f5] p-[7px]`}
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
                  rounded-[20px] border-[1px] 
                bg-[#F4F4F5] py-[7px] pl-[7px] pr-[29px] text-center placeholder-black 
                placeholder-opacity-100 ${
                  order.includes(filter.option.label) && 'hidden'
                }`}
                >
                  {filter.option.label}
                  <Image
                    className="absolute right-[10px] h-[14px] w-[16px] cursor-pointer opacity-50"
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
                    }}
                    className="border-box relative mt-[15px] flex items-center rounded-[20px] border-[1px] border-[#FF0000] bg-[#F4F4F5] py-[7px] pl-[7px] pr-[7px] text-center text-[#FF0000] hover:bg-[#FF0000] hover:text-white"
                  >
                    <X />
                    <p>
                      Clear {jobs.length > 20 ? '20+' : jobs.length} results
                    </p>
                  </button>
                )}
            </div>
          </div>
          <InfiniteScroll
            dataLength={jobs.length}
            next={() => fetchJobs('refetch')}
            hasMore={hasMore}
            loader={<h4>Carregando...</h4>}
            endMessage={<p>Nenhum trabalho adicional para carregar.</p>}
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
              <JobCard job={job} key={index} />
            ))}
          </InfiniteScroll>
        </div>
      </div>
    </>
  )
}

export default RolesPage
