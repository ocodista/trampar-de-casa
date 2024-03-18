import { FocusBanner } from 'app/landing-page/FocusBanner'
import { Github } from 'lucide-react'
import partnershipImage from '../../public/images/partnership.png'
import CompanyCard from 'app/components/ui/CompanyCard'
import { companies } from 'app/landing-page/PartnerCompanies'

const SupportingCompanies = () => {
  return (
    <>
      <FocusBanner />
      <div className="container mx-auto sm:pt-16 md:pt-20 lg:pt-28">
        <div className="flex h-[300px] pt-[30px] sm:h-[350px] md:h-[400px] lg:h-[479px]">
          <div className="flex w-3/6 flex-col items-center justify-center">
            <p className="text-[15px]  font-bold sm:text-[30px] md:text-[45px] lg:text-[60px]">
              Empresas que apoiam o trabalho remoto
            </p>
            <p className="pt-[20px] text-[12px] sm:pt-[25px] sm:text-[18px] md:pt-[30px] md:text-[20px] lg:pt-[35px] lg:text-[26px]">
              O trabalho remoto tem se tornado cada vez mais comum, e várias
              empresas ao redor do mundo têm adotado essa prática para
              proporcionar flexibilidade e uma vida melhor para seus
              funcionários.
            </p>
          </div>
          <div className="flex w-3/6 items-center justify-end">
            <img
              className="h-[180px] w-[180px] object-cover sm:h-[300px] sm:w-[300px] md:h-[350px] md:w-[350px] lg:h-[500px] lg:w-[500px]"
              src={partnershipImage.src}
              alt="Hearth Image"
            />
          </div>
        </div>
        <div className="mt-14 sm:mt-20 md:mt-32 lg:mt-36">
          <p className="mb-[50px] text-[20px] font-bold sm:text-[27px] md:text-[27px] lg:text-[27px]">
            Empresas que apoiam:
          </p>
          <div className="flex flex-wrap justify-center gap-5 pb-16 sm:gap-5 md:gap-10 lg:gap-16">
            {companies.map((company) => (
              <CompanyCard
                key={company.name}
                companyWebsite={company.url}
                logoSrc={company.imagePath}
                companyName={company.name}
                description={company.description}
              />
            ))}
          </div>
        </div>
        <div className="flex h-[50px] items-center justify-between sm:h-[60px] md:h-[80px] lg:h-[100px]">
          <p className="text-[14px] font-medium sm:text-[16px] md:text-[18px] lg:text-[20px]">
            ©2024 Trampar de Casa
          </p>
          <a
            href={'https://github.com/ocodista/trampar-de-casa'}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github className="h-[26px] w-[26px] sm:h-[28px] sm:w-[28px] md:h-[30px] md:w-[30px] lg:h-[32px] lg:w-[32px]" />
          </a>
        </div>
      </div>
    </>
  )
}

export default SupportingCompanies
