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

const SupportingCompanies = () => {
  const [tecnologias, setTecnologias] = useState([
    'Vue',
    'React',
    'Node',
    'Next',
    'Postgres',
    'Java',
    '.Net',
    ' PHP',
  ])
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
              {tecnologias.map((tecnologia, index) => (
                <button
                  key={index}
                  className="rounded-[20px] bg-[#F4F4F5] px-[15px] py-[2px]"
                >
                  {tecnologia}
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
                <button className="rounded-[20px] bg-[#F4F4F5] px-[15px] py-[2px]">
                  Estágio
                </button>
                <button className="rounded-[20px] bg-[#F4F4F5] px-[15px] py-[2px]">
                  Júnior
                </button>
                <button className="rounded-[20px] bg-[#F4F4F5] px-[15px] py-[2px]">
                  Pleno
                </button>
                <button className="rounded-[20px] bg-[#F4F4F5] px-[15px] py-[2px]">
                  Sênior
                </button>
              </div>
            </div>
            <div className="mt-[25px]">
              <h1 className="mb-[15px] text-[20px] font-bold">País</h1>
              <div className="flex flex flex-wrap gap-[10px]">
                <button className="h-[35px] w-[35px]">
                  <Image alt="teste" src={brasil}></Image>
                </button>
                <button className="h-[35px] w-[35px]">
                  <Image alt="teste" src={USA}></Image>
                </button>
                <button className="h-[35px] w-[35px]">
                  <Image alt="teste" src={UK}></Image>
                </button>
              </div>
            </div>
          </div>
          <div className="flex w-[70%] flex-col items-center gap-[10px]">
            <JobCard />
          </div>
        </div>
      </div>
    </>
  )
}

export default SupportingCompanies
