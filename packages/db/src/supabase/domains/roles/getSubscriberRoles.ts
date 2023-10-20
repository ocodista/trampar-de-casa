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
  Portuguese = 'Portuguese' 
} 


export const getSubscriberRoles = async (
  subscriber: Subscribers,
  supabase: SupabaseClient
) => {
  console.time(`getSubscriberRoles#${subscriber.email}`)
  type QueryBuilder = ReturnType<ReturnType<typeof supabase.from>['select']>

  const filterBySkill = (skills: string[], query: QueryBuilder) => {
    return query.in('skills', skills)
  }
  const filterByEnglish = (
    englishLevel: EnglishLevel | null,
    query: QueryBuilder
  ) => {
    if (!englishLevel) return query
    if (!(englishLevelScore[englishLevel] >= englishLevelScore.Advanced)) {
      return query.filter('language', 'not.eq', RoleLanguage.English)
    }

    return query
  }
  const filterByExp = (startedWorkedAt: Date | null, query: QueryBuilder) => {
    if (!startedWorkedAt) return query
    const currentDate = new Date()
    const yearOfExperience =
      currentDate.getFullYear() - new Date(startedWorkedAt).getFullYear()
    // lte worked as gte (?)
    return query.lte('minimumYears', yearOfExperience)
  }
  const baseQuery = await supabase
    .from(Entities.Roles)
    .select()
    .eq('ready', true)
  // const filteredBySkill = filterBySkill(subscriber.skills as string[], baseQuery)

  console.timeEnd(`getSubscriberRoles#${subscriber.email}`)
  return baseQuery.data as Role[]
}
