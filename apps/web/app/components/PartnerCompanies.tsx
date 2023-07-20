import Image from 'next/image'

interface Company {
  name: string
  url: string
  description: string
  imagePath: string
}

const companies: Company[] = [
  {
    name: 'Strider',
    url: 'https://app.onstrider.com/r/trampar_de_casa',
    description: 'Empresa brasileira com vagas internacionais 100% remotas.',
    imagePath: '/images/companies/strider.webp',
  },
  {
    name: 'Meteor',
    url: 'https://www.meteor.com/',
    description:
      'Plataforma OpenSource para construção de sistemas web, mobile e desktop com JavaScript ou TypeScript.',
    imagePath: '/images/companies/meteor.webp',
  },
  {
    name: 'FrontIn',
    url: 'https://frontinsampa.com.br/pt-br',
    description:
      'Empresa especializada em produção de eventos e conteúdo de tecnologia.',
    imagePath: '/images/companies/frontin.webp',
  },
]

const CompanySection = ({ name, imagePath, url, description }: Company) => (
  <a href={url} target="_blank">
    <Image
      src={imagePath}
      alt={`Logo da empresa ${name}`}
      className="cursor-pointer aspect-video object-contain min-w-[128px] mx-10"
      title={description}
      width={128}
      height={28}
    />
  </a>
)

export const PartnerCompanies = () => {
  return (
    <section>
      <p className="text-sm text-gray-500 font-semibold">
        EMPRESAS QUE APOIAM O TRABALHO REMOTO
      </p>
      <div className="overflow-hidden w-full">
        <span
          className={`flex justify-start items-center w-full group max-lg:w-1/4`}
        >
          <span className="flex gap-10 animate-scroll-left group-hover:paused">
            {companies.map((company) => (
              <CompanySection key={company.name} {...company} />
            ))}
          </span>
          <span
            className="flex gap-10 animate-scroll-left group-hover:paused"
            style={{ transform: 'translateX(100%)' }}
          >
            {companies.map((company) => (
              <CompanySection
                key={company.name}
                {...company}
                aria-hidden={true}
              />
            ))}
          </span>
        </span>
      </div>
    </section>
  )
}
