'use client'
import { FocusBanner } from 'app/landing-page/FocusBanner'
import { ChevronDown, Search } from 'lucide-react'
import Presentation from '../../components/presentation'
import { useState } from 'react'
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

const technologys = ['C++', 'GO', 'PYTHON', 'RUST', 'WEB3']

const experienceLevels = ['Estágio', 'Júnior', 'Pleno', 'Sênior']

const flags = ['Brasil', 'Estados Unidos', 'Reino Unido']

const RolesPage = () => {
  const [selectedCountry, setSelectedCountry] = useState([])
  const [selectedTechnology, setSelectedTechnology] = useState([])
  const [selectedLevel, setSelectedLevel] = useState([])
  const [jobs, setJobs] = useState([])
  const [salaryOpen, setSalaryOpen] = useState(false)
  const [rangeValue, setRangeValue] = useState(50)
  const [previewRangeValue, setPreviewRangeValue] = useState<number>()
  const [filters, setFilters] = useState([])

  const fetchJobs = async (
    countries: Array<string>,
    technologies: Array<string>,
    levels: Array<string>
  ) => {
    const idsArray = technologies.map((tech) => {
      const skill = skillArray.find((skill) => skill.normalized === tech)
      return skill ? skill.id.toString() : null
    })

    try {
      let query = supabase
        .from('Roles')
        .select('*')
        .order('createdAt', { ascending: false })

      if (countries.length > 0) {
        query = query.in('country', countries)
      }

      if (levels.length > 0) {
        query = query.textSearch('description', `${levels.join(' OR ')}`)
      }

      const { data, error } = await query

      if (error) {
        throw error
      }

      if (idsArray.length) {
        const filteredData = data.filter((item) =>
          idsArray.some((id) => item.skillsId.includes(id))
        )
        setJobs(filteredData)
        return
      }
      setJobs(data)
    } catch (error) {
      console.error('Erro ao buscar dados do banco de dados:', error.message)
    }
  }

  const handleTechnologySelection = (technology: string) => {
    if (selectedTechnology.includes(technology)) {
      setSelectedTechnology((prevState) =>
        prevState.filter((item) => item !== technology)
      )
      return
    }
    setSelectedTechnology((prevState) => [...prevState, technology])
  }

  const handleLevelSelection = (level: string) => {
    if (selectedLevel.includes(level)) {
      setSelectedLevel((prevState) =>
        prevState.filter((item) => item !== level)
      )
      return
    }
    setSelectedLevel((prevState) => [...prevState, level])
  }

  const handleCountrySelection = (country: string) => {
    if (selectedCountry.includes(country)) {
      setSelectedCountry((prevState) =>
        prevState.filter((item) => item !== country)
      )
      return
    }
    setSelectedCountry((prevState) => [...prevState, country])
  }

  const handleSearch = () => {
    fetchJobs(selectedCountry, selectedTechnology, selectedLevel)
  }

  const options = [
    'teste 1',
    'Option 2',
    'Option 3',
    'teste 1',
    'Option 2',
    'Option 3',
    'teste 1',
    'Option 2',
    'Option 3',
    'teste 1',
    'Option 2',
    'Option 3',
    'teste 1',
    'Option 2',
    'Option 3',
    'teste 1',
    'Option 2',
    'Option 3',
    'teste 1',
    'Option 2',
    'Option 3',
    'teste 1',
    'Option 2',
    'Option 3',
  ]

  const handleDeleteFilter = ({ filter }) => {
    const newFilterArray = filters.filter((item) => item !== filter)
    setFilters(newFilterArray)
  }

  const handleInputRange = () => {
    if (previewRangeValue) {
      const newFilterArray = filters.filter(
        (value) => value !== previewRangeValue
      )
      setFilters([rangeValue, ...newFilterArray])
      setPreviewRangeValue(rangeValue)
      return
    }
    setFilters((prevState) => [rangeValue, ...prevState])
    setPreviewRangeValue(rangeValue)
  }

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
            <div className="flex gap-[20px]">
              <DynamicInput
                placeholder="🔍 Search"
                options={technologys}
                setFilters={setFilters}
              />
              <DynamicInput
                placeholder="🌏 Location"
                options={flags}
                setFilters={setFilters}
              />
              <button
                onClick={() => setSalaryOpen(!salaryOpen)}
                className="border-box relative flex w-[150px] items-center rounded-[20px] 
                border-[1px] bg-[#F4F4F5] py-[9px] pl-[14px] pr-[9px] text-black text-opacity-100"
              >
                <span>💵 Salary</span>
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
                placeholder="🎪 Level"
                options={experienceLevels}
                setFilters={setFilters}
              />
            </div>
            <div className="flex gap-[15px]">
              {filters.map((filter) => (
                <div
                  key={filter}
                  className="border-box relative mt-[15px] flex w-[150px] items-center 
                  justify-center rounded-[20px] border-[1px] 
                bg-[#F4F4F5] py-[7px] pl-[7px] pr-[29px] text-center placeholder-black 
                placeholder-opacity-100"
                >
                  <ChevronDown />
                  {filter}
                  <Image
                    className="absolute right-[12px] h-[14px] w-[16px] opacity-50"
                    alt="Close tag"
                    src={close}
                    onClick={() => handleDeleteFilter({ filter })}
                  />
                </div>
              ))}
            </div>
            {/* <div className="flex flex-wrap gap-[15px]">
              {technologys.map((technology) => (
                <button
                  key={technology}
                  className={`border-box rounded-[20px] border-[1px] bg-[#F4F4F5] px-[15px] py-[2px]  ${
                    selectedTechnology.includes(technology)
                      ? 'border-black'
                      : 'border-[#F4F4F5]'
                  }`}
                  onClick={() => handleTechnologySelection(technology)}
                >
                  {technology}
                </button>
              ))}
            </div> */}
            {/* <div className="mt-[25px]">
              <h1 className="mb-[15px] text-[20px] font-bold">
                Salário mensal (em reais)
              </h1>
              <input type="range" min="0" max="100" className="w-full" />
            </div>
            <div className="mt-[25px]">
              <h1 className="mb-[15px] text-[20px] font-bold">Nível</h1>
              <div className="flex flex-wrap gap-[15px]">
                {experienceLevels.map((level) => (
                  <button
                    key={level}
                    onClick={() => handleLevelSelection(level)}
                    className={`border-box rounded-[20px] border-[1px] bg-[#F4F4F5] px-[15px] py-[2px]  ${
                      selectedLevel.includes(level)
                        ? 'border-black'
                        : 'border-[#F4F4F5]'
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>
            <div className="mt-[25px]">
              <h1 className="mb-[15px] text-[20px] font-bold">País</h1>
              <div className="flex flex flex-wrap gap-[10px]">
                {flags.map(({ alt, src, country }) => (
                  <button
                    key={country}
                    onClick={() => handleCountrySelection(country)}
                    className={`h-[35px] w-[35px] rounded-[100px] border-[1px] ${
                      selectedCountry.includes(country)
                        ? 'border-black'
                        : 'border-[#F4F4F5]'
                    }`}
                  >
                    <Image alt={alt} src={src}></Image>
                  </button>
                ))}
              </div>
            </div>
            <div className="mt-[25px]">
              <button
                onClick={handleSearch}
                className="h-[50px] w-full rounded-[100px] bg-[#6B7280] text-[20px]"
              >
                Pesquisar
              </button>
            </div> */}
          </div>
          <div className="flex w-full flex-col flex-col items-center gap-[10px]">
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
