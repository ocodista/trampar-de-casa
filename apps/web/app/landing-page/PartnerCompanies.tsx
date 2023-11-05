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
    imagePath: '/images/companies/strider.svg',
  },
  {
    name: 'Impulso',
    url: '',
    description: '',
    imagePath: '/images/companies/impulso.png',
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
  {
    name: 'Rock n code',
    url: 'https://anchor.fm/curtinhasdoed',
    description: 'Podcast de tecnologia',
    imagePath: '/images/companies/rock_n_code.webp',
  },
  {
    name: 'Slikdesk',
    url: 'https://slik.com.br/trampardecasa',
    description:
      'A empresa oferece mesas de trabalho com regulagem de altura, visando proporcionar maior conforto e produtividade aos usuários.',
    imagePath: '/images/companies/slikdesk.webp',
  },
  {
    name: 'Fros',
    url: 'https://fros.dev/trampar-de-casa',
    description:
      'Compartilhe seu melhor projeto, receba prêmios e seja reconhecido por suas contribuições à comunidade open-source.',
    imagePath: '/images/companies/fros.webp',
  },
  {
    name: 'Crafta',
    url: 'https://crafta.studio',
    description:
      'Por uma simples assinatura, a Crafta disponibiliza a sua empresa programadores e designers experientes prontos para trabalho.',
    imagePath: '/images/companies/crafta.webp',
  },
]

const CompanySection = ({ name, imagePath, url, description }: Company) => (
  <a href={url} target="_blank">
    <Image
      src={imagePath}
      alt={`Logo da ${name}`}
      className="mx-10 aspect-video min-w-[128px] cursor-pointer object-contain"
      title={description}
      width={128}
      height={28}
    />
  </a>
)

export const PartnerCompanies = () => {
  return (
    <section>
      <p className="text-sm font-semibold text-gray-500">
        EMPRESAS QUE APOIAM O TRABALHO REMOTO
      </p>
      <div className="w-full overflow-hidden">
        <span
          className={`group flex w-full items-center justify-start max-lg:w-1/4`}
        >
          <span className="animate-scroll-left group-hover:paused flex gap-10">
            {companies.map((company) => (
              <CompanySection key={company.name} {...company} />
            ))}
          </span>
          <span
            className="animate-scroll-left group-hover:paused flex gap-10"
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
