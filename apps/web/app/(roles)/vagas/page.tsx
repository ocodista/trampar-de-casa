'use client'
import { FocusBanner } from 'app/landing-page/FocusBanner'
import { Search } from 'lucide-react'
import Presentation from '../../components/presentation'

const SupportingCompanies = () => {
  return (
    <>
      <FocusBanner />
      <div className="container mx-auto sm:pt-16 md:pt-20 lg:pt-20">
        <div className="flex flex-col items-center justify-center text-center text-[48px]">
          <h1>
            Encontre um trabalho remoto
            <br /> de qualquer lugar
          </h1>
          <div className="relative">
            <Presentation />
            <Search className="absolute left-[35px] top-[34px]" size={'25px'} />
            <input className="color-[#0f1115] mx-[14px] mb-[14px] mt-[7px] w-[400px] rounded-[100px] border-[2px] py-[12px] pl-[60px] pr-[12px] text-left text-[20px]"></input>
          </div>
        </div>
      </div>
    </>
  )
}

export default SupportingCompanies
