'use client'

import JobArticle from 'app/components/ui/JobArticle'
import { SupabaseView } from 'db/src/supabase/utilityTypes'

type RolesSkillsView = SupabaseView<'RolesSkillsView'>
export function Roles({ roles }: { roles: RolesSkillsView[] }) {
  if (!roles?.length)
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
      {roles.map((job, i) => (
        <li className="w-full" key={`${job.company}-${i}`}>
          <JobArticle {...job} />
        </li>
      ))}
    </ul>
  )
}
