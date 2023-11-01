'use server '
import { Roles } from './Roles'
import { SearchSection } from './SearchSection'
// import { openings20231011 as Openings } from "../../../manual-email-sender/src/openings-email/2023-10-18/openings";

type Props = {
  searchParams: {
    page: string
    skills: string
    country: string
  }
}
export default async function Page(props: Props) {
  return (
    <div className="container flex flex-col gap-2 py-10">
      <h1 className="font-heading max-xs:text-4xl mb-3 text-6xl font-bold leading-tight tracking-tight md:text-7xl">
        Vagas remotas
      </h1>

      <p className="mb-8 text-xl leading-relaxed text-gray-600">
        Nós listamos oportunidades para{' '}
        <span className="font-medium">trampar de casa</span> que oferecem uma
        melhor qualidade de vida.
      </p>
      <SearchSection />
      <Roles />
    </div>
  )
}
