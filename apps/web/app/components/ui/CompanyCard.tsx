import { LinkIcon } from '@heroicons/react/20/solid'

interface CompanyCardProps {
  logoSrc: string
  companyName: string
  description: string
  companyWebsite: string
}

const CompanyCard: React.FC<CompanyCardProps> = ({
  logoSrc,
  companyName,
  description,
  companyWebsite,
}) => {
  return (
    <div className="relative flex h-[360px] w-[382px] flex-col items-center justify-center rounded-lg border-[1px] border-black sm:h-[390px] sm:w-[432px] md:h-[330px] md:w-[332px] lg:h-[380px] lg:w-[402px]">
      <a
        href={companyWebsite}
        target="_blank"
        rel="noopener noreferrer"
        className=" absolute right-3 top-3 h-[33px] w-[34px] sm:h-[37px] sm:w-[38px] md:h-[39px] md:w-[40px] lg:h-[41px] lg:w-[42px]"
      >
        <LinkIcon />
      </a>
      <a
        href={companyWebsite}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute h-full w-full cursor-pointer md:hidden lg:hidden"
      ></a>
      <img
        src={logoSrc}
        alt={`Logo da ${companyName}`}
        className="mb-[20px] h-[88px] w-[188px] min-w-[128px] object-contain  sm:h-[108px] sm:w-[208px] md:h-[98px] md:w-[198px] lg:h-[98px] lg:w-[198px]"
      />
      <p className="w-[90%] break-all text-justify text-[20px] sm:text-[25px] md:text-[20px] lg:text-[22px]">
        {description}
      </p>
    </div>
  )
}

export default CompanyCard
