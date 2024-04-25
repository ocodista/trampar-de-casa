'use client'
import { FocusBanner } from 'app/landing-page/FocusBanner'
import { ChevronDown, Search, X } from 'lucide-react'
import Presentation from '../../components/presentation'
import { useEffect, useState } from 'react'
import close from '../../../public/images/close.svg'
import JobCard from '../../components/ui/JobCard'
import { createClient } from '@supabase/supabase-js'
import { skillArray } from '../../../../../packages/shared/src/infos/skills'
import DynamicInput from 'app/components/DynamicInput'
import Image from 'next/image'
import InfiniteScroll from 'react-infinite-scroll-component'

const supabase = createClient(
  process.env['NEXT_PUBLIC_SUPABASE_URL'] as string,
  process.env['NEXT_PUBLIC_SUPABASE_ANON_KEY'] as string
)

interface Filters {
  option: string
  inputType: string
}

const technologys = ['🖥️ C++', '🚀 GO', '🐍 PYTHON', '⚙️ RUST', '🌐 WEB3']

const experienceLevels = ['🎓 Estágio', '👶 Júnior', '🧑‍💼 Pleno', '👴 Sênior']

const flags = ['🇧🇷 Brasil', '🇺🇸 Estados Unidos', '🇬🇧 Reino Unido']

const order = ['🕒 Trabalhos mais recentes', '🕒 Trabalhos mais antigos']

const RolesPage = () => {
  const [jobs, setJobs] = useState([])
  const [useTyped, setUseTyped] = useState(true)
  const [inputUseTypedValue, setInputUseTypedValue] = useState('')
  const [salaryOpen, setSalaryOpen] = useState(false)
  const [rangeValue, setRangeValue] = useState(50)
  const [previewRangeValue, setPreviewRangeValue] = useState('')
  const [filters, setFilters] = useState<Filters[]>([])
  const [hasMore, setHasMore] = useState(true)

  const formatFiltersData = (filters, type: string) => {
    return filters
      .filter((filter) => filter.inputType === type)
      .map((filter) =>
        filter.option.replace(/[^A-Za-záéíóúãõâêîôûàèìòùç0-9\s+-]/g, '').trim()
      )
  }

  const fetchJobs = async (type: string) => {
    try {
      const countryOptionsFormatted = formatFiltersData(filters, 'country')
      const skillsFormatted = formatFiltersData(filters, 'skill')
      const matchingSkills = skillArray.filter((skill) =>
        skillsFormatted.includes(skill.normalized)
      )
      const skillIdsArray = matchingSkills.map((skill) => skill.id.toString())
      const levelsFormated = formatFiltersData(filters, 'level')
      const orderFilter = filters.find((filter) => filter.inputType === 'order')

      let query = supabase.from('Roles').select('*').limit(21)

      if (countryOptionsFormatted.length > 0) {
        query = query.in('country', countryOptionsFormatted)
      }

      if (skillIdsArray.length > 0) {
        query = query.contains('skillsId', skillIdsArray)
      }

      if (levelsFormated.length > 0) {
        const filters = levelsFormated.map(
          (level) => `description.ilike.%${level}%`
        )
        const combinedFilter = filters.join(',')
        query = query.or(combinedFilter)
      }

      if (orderFilter) {
        const orderOptionFormated = formatFiltersData(filters, 'order')
        query = query.order('createdAt', {
          ascending:
            orderOptionFormated[0] === 'Trabalhos mais antigos' ? true : false,
        })
      } else {
        query = query.order('createdAt', { ascending: false })
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
    } catch (error) {
      console.error('Erro ao buscar dados do banco de dados:', error.message)
    }
  }

  const handleDeleteFilter = ({ filter }: { filter: Filters }) => {
    setFilters((prevFilters) =>
      prevFilters.filter((item) => item.option !== filter.option)
    )

    setHasMore(true)
  }

  const handleInputRange = () => {
    if (previewRangeValue) {
      const newFilterArray = filters.filter(
        (value) => value.option !== previewRangeValue
      )
      setFilters([
        { option: `💵 >$${rangeValue}k/y`, inputType: 'range' },
        ...newFilterArray,
      ])
      setPreviewRangeValue(`💵 >$${rangeValue}k/y`)
      return
    }
    setFilters((prevState) => [
      { option: `💵 >$${rangeValue}k/y`, inputType: 'range' },
      ...prevState,
    ])
    setPreviewRangeValue(`💵 >$${rangeValue}k/y`)
  }

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
              Encontre um trabalho remoto
              <br /> de qualquer lugar
            </h1>
            <div className="relative">
              {useTyped && <Presentation />}
              <Search
                className="absolute left-[35px] top-[34px]"
                size={'25px'}
              />
              <input
                className="color-[#0f1115] mx-[14px] mb-[14px] mt-[7px] w-[400px] 
              rounded-[100px] border-[2px] py-[12px] pl-[60px] pr-[12px] text-left 
              text-[20px]"
                onChange={(e) => setInputUseTypedValue(e.target.value)}
                value={inputUseTypedValue}
                onFocus={() => setUseTyped(false)}
                onBlur={() => {
                  setUseTyped(true)
                  setInputUseTypedValue('')
                }}
              ></input>
            </div>
          </div>
        </div>
        <div className="mb-[150px] mt-[35px]">
          <div className="w-full">
            <div className="flex justify-between">
              <div className="flex gap-[20px]">
                <DynamicInput
                  placeholder="🔍 Procurar"
                  options={technologys}
                  setFilters={setFilters}
                  filterType="skill"
                  filters={filters}
                />
                <DynamicInput
                  placeholder="🌏 Local"
                  options={flags}
                  setFilters={setFilters}
                  filterType="country"
                  filters={filters}
                />
                <button
                  onClick={() => setSalaryOpen(!salaryOpen)}
                  className="border-box relative flex w-[150px] items-center rounded-[20px] 
                border-[1px] bg-[#F4F4F5] py-[9px] pl-[14px] pr-[9px] text-black text-opacity-100"
                >
                  <span>💵 Salario</span>
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
                </button>
                <DynamicInput
                  placeholder="🚀 Níveis"
                  options={experienceLevels}
                  setFilters={setFilters}
                  filterType="level"
                  filters={filters}
                />
              </div>
              <DynamicInput
                placeholder="📊 Ordenar"
                options={order}
                filterType="order"
                setFilters={setFilters}
                filters={filters}
                optionConfig="w-[300px] right-0"
              />
            </div>
            <div className="flex gap-[15px]">
              {filters.map((filter) => (
                <div
                  key={filter.option}
                  className={`border-box relative mt-[15px] flex items-center 
                  rounded-[20px] border-[1px] 
                bg-[#F4F4F5] py-[7px] pl-[7px] pr-[29px] text-center placeholder-black 
                placeholder-opacity-100 ${
                  order.includes(filter.option) && 'hidden'
                }`}
                >
                  {filter.option}
                  <Image
                    className="absolute right-[10px] h-[14px] w-[16px] cursor-pointer opacity-50"
                    alt="Close tag"
                    src={close}
                    onClick={() => handleDeleteFilter({ filter })}
                  />
                </div>
              ))}
              {filters.length > 0 &&
                filters.some((filter) => !order.includes(filter.option)) && (
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
