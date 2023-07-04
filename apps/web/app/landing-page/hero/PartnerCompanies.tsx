import React from "react";
import { useTheme } from "next-themes";

interface Company {
  name: string;
  url: string;
  description: string;
  imagePathLight: string;
  imagePathDark: string;
  theme?: string;
}

const companies: Company[] = [
  {
    name: "Strider",
    url: "https://app.onstrider.com/r/trampar_de_casa",
    description: "Empresa brasileira com vagas internacionais 100% remotas.",
    imagePathLight: "images/brand-strider-usage-positive-color-color.png",
    imagePathDark: "images/brand-strider-usage-negative-color-color.png",
  },
]

const CompanySection = ({
  name,
  imagePathLight,
  imagePathDark,
  url,
  description,
  theme,
}: Company) => (
  <a href={url} target="_blank" className="w-auto p-3">
    <img
      src={theme == "dark" ? imagePathDark : imagePathLight}
      alt={`Logo da empresa ${name}`}
      className="w-32 cursor-pointer"
      title={description}
    />
  </a>
)

export const PartnerCompanies = () => {
  const { theme } = useTheme();
  return (
    <section>
      <p className="mb-6 text-sm dark:text-gray-200 text-gray-500 font-semibold">
        EMPRESAS QUE APOIAM O TRABALHO REMOTO
      </p>
      <div className="flex flex-wrap -m-3">
        {companies.map((company) => (
          <CompanySection key={company.name} {...company} theme={theme} />
        ))}
      </div>
    </section>
  )
}
