'use server '
import { getOpenings } from 'app/api/vagas/getOpenings'
import { getOpeningsPageLength } from 'app/api/vagas/getOpeningsPageLength'
import { z } from 'zod'
import { Pagination } from './Pagination'
import { Roles } from './Roles'
import { SearchSection } from './SearchSection'

const pageSizeSchema = z.coerce.number().default(10)

const pageSchema = z.coerce.number().default(1)

type Props = {
  searchParams: {
    page?: string
    skills?: string
    country?: string
  }
}
export default async function Page(props: Props) {
  const page = pageSchema.parse(props.searchParams.page)
  const openings = await getOpenings({
    page,
  })
  const pagesLength = await getOpeningsPageLength()

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
      <Roles roles={openings} />
      <Pagination totalPages={pagesLength} />
    </div>
  )
}
