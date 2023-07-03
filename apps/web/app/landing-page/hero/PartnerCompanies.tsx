import React from 'react'

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
    imagePath: 'images/brand-strider-usage-positive-color-color.png',
  },
]

const CompanySection = ({ name, imagePath, url, description }: Company) => (
  <a href={url} target="_blank" className="w-auto p-3">
    <img
      src={imagePath}
      alt={`Logo da empresa ${name}`}
      className="w-32 cursor-pointer"
      title={description}
    />
  </a>
)

export const PartnerCompanies = () => {
  return (
    <section>
      <p className="mb-6 text-sm text-gray-500 font-semibold">
        EMPRESAS QUE APOIAM O TRABALHO REMOTO
      </p>
      <div className="flex flex-wrap -m-3">
        {companies.map((company) => (
          <CompanySection key={company.name} {...company} />
        ))}
      </div>
    </section>
  )
}
