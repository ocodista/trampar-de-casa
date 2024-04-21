'use client'
import { FocusBanner } from 'app/landing-page/FocusBanner'
import { Search } from 'lucide-react'
import Presentation from '../../components/presentation'
import { useState } from 'react'
import brasil from '../../../public/images/brazilianFlag.png'
import USA from '../../../public/images/USAFlag.png'
import UK from '../../../public/images/UKflag.png'
import Image from 'next/image'
import JobCard from '../../components/ui/JobCard'
import { createClient } from '@supabase/supabase-js'
import { skillArray } from '../../../../../packages/shared/src/infos/skills'

const supabase = createClient(
  process.env['NEXT_PUBLIC_SUPABASE_URL'] as string,
  process.env['NEXT_PUBLIC_SUPABASE_ANON_KEY'] as string
)

const technologys = ['C++', 'GO', 'PYTHON', 'RUST', 'WEB3']

const experienceLevels = ['Estágio', 'Júnior', 'Pleno', 'Sênior']

const flags = [
  {
    country: 'Brasil',
    alt: 'Bandeira do Brasil',
    src: brasil,
  },
  {
    country: 'Estados Unidos',
    alt: 'Bandeira dos Estados Unidos',
    src: USA,
  },
  {
    country: 'Reino Unido',
    alt: 'Bandeira do Reino Unido',
    src: UK,
  },
]

const RolesPage = () => {
  const [selectedCountry, setSelectedCountry] = useState([])
  const [selectedTechnology, setSelectedTechnology] = useState([])
  const [selectedLevel, setSelectedLevel] = useState([])
  const [jobs, setJobs] = useState([])

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
              <input className="color-[#0f1115] mx-[14px] mb-[14px] mt-[7px] w-[400px] rounded-[100px] border-[2px] py-[12px] pl-[60px] pr-[12px] text-left text-[20px]"></input>
            </div>
          </div>
        </div>
        <div className="mb-[150px] mt-[35px] flex">
          <div className="w-[30%]">
            <h1 className="mb-[15px] text-[20px] font-bold">Tecnologia</h1>
            <div className="flex flex-wrap gap-[15px]">
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
            </div>
            <div className="mt-[25px]">
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
            </div>
          </div>
          <div className="flex w-[70%] flex-col flex-col items-center gap-[10px]">
            {jobs.map((job, index) => (
              <JobCard job={job} key={index} />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default RolesPage
