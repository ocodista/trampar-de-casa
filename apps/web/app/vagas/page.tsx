import JobArticle, { JobArticleProps } from 'app/components/ui/JobArticle'

import { openings20230802 } from '../../../manual-email-sender/src/openings-email/2023-08-02/openings'

export default function Page() {
  const { localOpenings, globalOpenings } = openings20230802

  const jobList = localOpenings.concat(globalOpenings) as JobArticleProps[]

  return (
    <div className="container flex flex-col gap-2 py-10">
      <h2 className="font-heading max-xs:text-4xl mb-3 text-6xl font-bold leading-tight tracking-tight md:text-7xl">
        Vagas remotas
      </h2>

      <p className="mb-8 text-xl leading-relaxed text-gray-600">
        Nós listamos oportunidades para{' '}
        <span className="font-medium">trampar de casa</span> que oferecem uma
        melhor qualidade de vida.
      </p>
      {jobList.map((job, i) => (
        <JobArticle key={i} {...job} />
      ))}
    </div>
  )
}
