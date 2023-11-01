'use client'
import JobArticle from 'app/components/ui/JobArticle'
import { useOpenings } from './useOpenings'

export function Roles() {
  const { openings } = useOpenings()

  if (!openings)
    return (
      <div className="space-y-2">
        <h2 className="text-center text-2xl font-medium text-slate-500">
          Todas as vagas da semana passada já estão fechadas.
          <br />
          Aguarde o próximo envio!
        </h2>
      </div>
    )

  return (
    <ul className="space-y-2">
      {openings.map((job, i) => (
        <li className="w-full" key={`${job.company}-${i}`}>
          <JobArticle {...job} />
        </li>
      ))}
    </ul>
  )
}
