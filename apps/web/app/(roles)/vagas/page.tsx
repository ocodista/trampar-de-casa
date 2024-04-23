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

const supabase = createClient(
  process.env['NEXT_PUBLIC_SUPABASE_URL'] as string,
  process.env['NEXT_PUBLIC_SUPABASE_ANON_KEY'] as string
)

const technologys = ['🖥️ C++', '🚀 GO', '🐍 PYTHON', '⚙️ RUST', '🌐 WEB3']

const experienceLevels = ['🎓 Estágio', '👶 Júnior', '🧑‍💼 Pleno', '👴 Sênior']

const flags = ['🇧🇷 Brasil', '🇺🇸 Estados Unidos', '🇬🇧 Reino Unido']

const order = [
  '👀 Mais visualizados',
  '📝 Mais aplicados',
  '🕒 Trabalhos mais recentes',
  '🌟 Melhores avaliados',
  '💰 Melhores pagamentos',
  '🔥 Hottest',
]

const RolesPage = () => {
  const [jobs, setJobs] = useState([])
  const [salaryOpen, setSalaryOpen] = useState(false)
  const [rangeValue, setRangeValue] = useState(50)
  const [previewRangeValue, setPreviewRangeValue] = useState('')
  const [filters, setFilters] = useState([])

  const fetchJobs = async (option?: string, filterType?: string) => {
    try {
      let query = supabase
        .from('Roles')
        .select('*')
        .order('createdAt', { ascending: false })
        .limit(10)

      if (option) {
        const optionFormatted = option
          .replace(/[^A-Za-záéíóúãõâêîôûàèìòùç0-9\s+-]/g, '')
          .trim()

        if (filterType === 'skill') {
          const skill = skillArray.find(
            (skill) => skill.normalized === optionFormatted
          )
          const skillId = skill ? skill.id.toString() : null
          query = query.filter('skillsId', 'cs', `{${skillId}}`)
        }

        if (filterType === 'country') {
          query = query.eq('country', optionFormatted)
        }

        if (filterType === 'level') {
          query = query.ilike('description', `%${optionFormatted}%`)
        }
      }
      console.log(query)
      const { data, error } = await query
      console.log({ DATAAAA: data, ERRROOOOORR: error })

      if (error) {
        throw error
      }

      setJobs(data)
    } catch (error) {
      console.error('Erro ao buscar dados do banco de dados:', error.message)
    }
  }

  const handleDeleteFilter = ({ filter }) => {
    const newFilterArray = filters.filter((item) => item !== filter)
    setFilters(newFilterArray)
  }

  const handleInputRange = () => {
    if (previewRangeValue) {
      const newFilterArray = filters.filter(
        (value) => value !== previewRangeValue
      )
      setFilters([`💵 >$${rangeValue}k/y`, ...newFilterArray])
      setPreviewRangeValue(`💵 >$${rangeValue}k/y`)
      return
    }
    setFilters((prevState) => [`💵 >$${rangeValue}k/y`, ...prevState])
    setPreviewRangeValue(`💵 >$${rangeValue}k/y`)
  }

  useEffect(() => {
    fetchJobs()
  }, [])

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
              <Presentation />
              <Search
                className="absolute left-[35px] top-[34px]"
                size={'25px'}
              />
              <input
                className="color-[#0f1115] mx-[14px] mb-[14px] mt-[7px] w-[400px] 
              rounded-[100px] border-[2px] py-[12px] pl-[60px] pr-[12px] text-left 
              text-[20px]"
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
                  fetchJobs={fetchJobs}
                  filterType="skill"
                  filters={filters}
                />
                <DynamicInput
                  placeholder="🌏 Local"
                  options={flags}
                  setFilters={setFilters}
                  fetchJobs={fetchJobs}
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
                  fetchJobs={fetchJobs}
                  filterType="level"
                  filters={filters}
                />
              </div>
              <DynamicInput
                placeholder="📊 Ordenar"
                options={order}
                setFilters={setFilters}
                fetchJobs={fetchJobs}
                filterType="order"
                filters={filters}
                optionConfig="w-[300px] right-0"
              />
            </div>
            <div className="flex gap-[15px]">
              {filters.map((filter) => (
                <div
                  key={filter}
                  className="border-box relative mt-[15px] flex items-center 
                  rounded-[20px] border-[1px] 
                bg-[#F4F4F5] py-[7px] pl-[7px] pr-[29px] text-center placeholder-black 
                placeholder-opacity-100"
                >
                  {filter}
                  <Image
                    className="absolute right-[10px] h-[14px] w-[16px] cursor-pointer opacity-50"
                    alt="Close tag"
                    src={close}
                    onClick={() => handleDeleteFilter({ filter })}
                  />
                </div>
              ))}
              {filters.length ? (
                <button
                  onClick={() => {
                    setFilters([])
                    fetchJobs()
                  }}
                  className="border-box relative mt-[15px] flex 
                  items-center rounded-[20px] border-[1px] border-[#FF0000]
                bg-[#F4F4F5] py-[7px] pl-[7px] pr-[7px] text-center text-[#FF0000] hover:bg-[#FF0000] hover:text-white"
                >
                  <X />
                  <p>Clear {jobs.length > 20 ? '20+' : jobs.length} results</p>
                </button>
              ) : (
                ''
              )}
            </div>
          </div>
          <div className="mt-[25px] flex w-full flex-col flex-col gap-[10px]">
            {jobs.length > 0
              ? jobs.map((job, index) => <JobCard job={job} key={index} />)
              : 'Nenhum trabalho encontrado'}
          </div>
        </div>
      </div>
    </>
  )
}

export default RolesPage
