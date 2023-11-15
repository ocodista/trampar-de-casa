import { PostgrestFilterBuilder } from '@supabase/postgrest-js'
import { Database, SupabaseClient } from 'db'
import { Entities } from 'shared/src/enums/entities'
import { SupabaseTable } from '../../../supabase/utilityTypes'

type EnglishLevel = Database['public']['Enums']['EnglishLevel']
type Subscribers = SupabaseTable<'Subscribers'>
type Role = SupabaseTable<'Roles'>

const englishLevelScore: Record<EnglishLevel, number> = {
  Fluent: 3,
  Advanced: 2,
  Intermediary: 1,
  Beginner: 0,
}
enum RoleLanguage {
  English = 'English',
  Portuguese = 'Portuguese',
}

type RoleFilterBuilder = PostgrestFilterBuilder<
  Database['public'],
  Role,
  Role[],
  Database['public']['Tables']['Roles']['Relationships']
>

const fallbackLinks = [
  'https://app.onstrider.com/r/trampar_de_casa?job=bWlkLXNlbmlvci1iYWNrLWVuZC1lbmdpbmVlci00NWU5N2IxZD9yZWZlcnJhbD10cmFtcGFyX2RlX2Nhc2E=',
  'https://app.onstrider.com/r/trampar_de_casa?job=bWlkLXNlbmlvci1pbmZyYXN0cnVjdHVyZS1lbmdpbmVlci1lMGUxZGE3Mz9yZWZlcnJhbD10cmFtcGFyX2RlX2Nhc2E=',
  'https://app.onstrider.com/r/trampar_de_casa?job=c2VuaW9yLWRiYS1tc3NxbC04NjM3MThkMz9yZWZlcnJhbD10cmFtcGFyX2RlX2Nhc2E=',
  'https://app.onstrider.com/r/trampar_de_casa?job=c2VuaW9yLWZ1bGwtc3RhY2stZW5naW5lZXItcmVhY3QuanMtbm9kZS5qcy10eXBlc2NyaXB0LXN0cmlkZXItZWIwMGY5ZjE/cmVmZXJyYWw9dHJhbXBhcl9kZV9jYXNh',
  'https://app.onstrider.com/r/trampar_de_casa?job=c2VuaW9yLXNhbGVzZm9yY2UtZGV2ZWxvcGVyLWFwZXgtbGlnaHRpbmctN2EzZGU4NzQ/cmVmZXJyYWw9dHJhbXBhcl9kZV9jYXNh',
  'https://app.onstrider.com/r/trampar_de_casa?job=c2VuaW9yLWRldm9wcy1lbmdpbmVlci0yZmM3YWQ5MT9yZWZlcnJhbD10cmFtcGFyX2RlX2Nhc2E=',
  'https://app.onstrider.com/r/trampar_de_casa?job=c2VuaW9yLW1vYmlsZS1lbmdpbmVlci1zZGstNTg4ZDdhMTc/cmVmZXJyYWw9dHJhbXBhcl9kZV9jYXNh',
  'https://app.onstrider.com/r/trampar_de_casa?job=c2VuaW9yLWZ1bGwtc3RhY2stZW5naW5lZXItbm9kZS5qcy10eXBlc2NyaXB0LTE5Y2QxZmZhP3JlZmVycmFsPXRyYW1wYXJfZGVfY2FzYQ==',
  'https://app.onstrider.com/r/trampar_de_casa?job=c2VuaW9yLWJhY2stZW5kLWRhdGEtZW5naW5lZXItcHl0aG9uLXN0cmlkZXItMmI2MjQzNjM/cmVmZXJyYWw9dHJhbXBhcl9kZV9jYXNh',
  'https://app.onstrider.com/r/trampar_de_casa?job=c2VuaW9yLWlvcy1kZXZlbG9wZXItc3dpZnQtYWIyNGVmOTc/cmVmZXJyYWw9dHJhbXBhcl9kZV9jYXNh',
  'https://app.onstrider.com/r/trampar_de_casa?job=bWlkLWxldmVsLWJhY2stZW5kLWVuZ2luZWVyLW5vZGUuanMtOWM2MjdkNzA/cmVmZXJyYWw9dHJhbXBhcl9kZV9jYXNh',
  'https://app.onstrider.com/r/trampar_de_casa?job=c2VuaW9yLWJhY2stZW5kLWVuZ2luZWVyLXJ1Ynktb24tcmFpbHMtYTY1MTczYTc/cmVmZXJyYWw9dHJhbXBhcl9kZV9jYXNh',
  'https://app.onstrider.com/r/trampar_de_casa?job=c2VuaW9yLWZ1bGwtc3RhY2stZW5naW5lZXItZGphbmdvLXJlYWN0LmpzLTBhOTc2MjU0MmEwMj9yZWZlcnJhbD10cmFtcGFyX2RlX2Nhc2E=',
  'https://impulso.link/wiogqA',
  'https://impulso.link/46VsI5',
  'https://impulso.link/BCuZeM',
  'https://impulso.link/uDrPbz',
  'https://public.app.shortcut.com/62/meteor-software/docs/33uMJ3eJSqP9D4bK7qF45O/entrylevel-developer-advocate',
  'https://career.sigma.software/vacancy/back-end-developer/?utm_source=',
  'https://www.useopenwrench.com/careers/senior-software-engineer-scala?utm_source=',
  'https://www.useopenwrench.com/careers/senior-software-engineer-frontend?utm_source=',
  'https://boards.greenhouse.io/linx/jobs/5801160003',
  'https://careers.avalara.com/jobs/11928',
  'https://meta.jobs.recrut.ai/vagas/job/OM3KG3',
  'https://boards.greenhouse.io/gympass/jobs/6934918002',
  'https://incognia.recruitee.com/o/senior-software-engineer',
  'https://boards.greenhouse.io/offerfit/jobs/4316923005',
  'https://aisolutions.inhire.app/vagas/319c0b36-7725-4d98-aae1-56c9cf14f307/pessoa-desenvolvedora-php-sr-or-ai-solutions',
  'https://jobs.smartrecruiters.com/Experian/743999942773833-tech-lead',
  'https://devgrid.recruitee.com/o/plsql-developer',
  'https://blog.e-inscricao.com/vaga-analista-de-testes-pleno-qa/',
  'https://wexinc.wd5.myworkdayjobs.com/pt-BR/WEXInc/job/Brazil---Remote/Mid-Software-QA-Engineer_R13720',
  'https://jobs.recrutei.com.br/accountfy/vacancy/50570-analista-de-integracoes-senior',
  'https://jobs.ashbyhq.com/Deel/45acf60a-ef8a-41fe-a7fa-bdd4d7fdfa1a',
  'https://codegroup.pandape.infojobs.com.br/Detail/739977?ov=6&xtor=AL-366332662%3Fsource%3D',
  'https://careers.wildlifestudios.com/jobs/senior-fullstack-engineer-7003405002/',
  'https://careers.wildlifestudios.com/jobs/mobile-engineer-6995908002/',
  'https://boards.greenhouse.io/digibeeinc/jobs/4320213005',
  'https://venturus.inhire.app/vagas/794db923-e935-43c4-bcfd-625a767990c7/pessoa-desenvolvedora-back-end-python-sr',
]
function logDuplicates(arr: (string | null)[]): void {
  const seen: Record<string, boolean> = {}

  for (const item of arr) {
    const stringifiedItem = JSON.stringify(item)

    if (seen[stringifiedItem]) {
      console.log(item)
    } else {
      seen[stringifiedItem] = true
    }
  }
}

export const getSubscriberRoles = async (
  subscriber: Subscribers,
  supabase: SupabaseClient<Database>
) => {
  const filterBySkill = (skills: string[] | null, query: RoleFilterBuilder) => {
    if (!skills) return query
    return query.filter('skillsId', 'ov', `{${skills}}`)
  }
  const filterByEnglish = (
    englishLevel: EnglishLevel | null,
    query: RoleFilterBuilder
  ) => {
    if (!englishLevel) return query
    if (!(englishLevelScore[englishLevel] >= englishLevelScore.Advanced)) {
      return query.filter('language', 'not.eq', RoleLanguage.English)
    }

    return query
  }
  const filterByExp = (
    startedWorkedAt: Subscribers['startedWorkingAt'],
    query: RoleFilterBuilder
  ) => {
    if (!startedWorkedAt) return query
    const currentDate = new Date()
    const yearOfExperience =
      currentDate.getFullYear() - new Date(startedWorkedAt).getFullYear()

    return query.lte('minimumYears', yearOfExperience)
  }

  if (!subscriber.skillsId) {
    const { data, error } = await supabase
      .from(Entities.Roles)
      .select()
      .in('url', fallbackLinks)
    if (error) {
      console.log(error)
      throw error
    }
    logDuplicates(data.map(({ url }) => url))
    return data || []
  }

  const baseQuery = supabase
    .from(Entities.Roles)
    .select()
    .eq('ready', true)
    .limit(60)
  const { data, error } = await filterBySkill(subscriber.skillsId, baseQuery)

  if (error) {
    console.log(error)
    throw error
  }

  return data || []
}
