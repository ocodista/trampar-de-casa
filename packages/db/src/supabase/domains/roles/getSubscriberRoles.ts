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

  const baseQuery = supabase.from(Entities.Roles).select().eq('ready', true)
  const { data, error } = await filterBySkill(subscriber.skillsId, baseQuery)

  if (error) {
    console.log(error)
    throw error
  }

  return data || []
}
