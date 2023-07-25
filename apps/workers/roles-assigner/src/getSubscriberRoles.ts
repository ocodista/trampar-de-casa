import {
  EnglishLevel,
  RoleLanguage,
  Roles,
  Subscribers,
  SupabaseClient,
} from 'db'
import { Entities } from 'shared/src/enums/entities'
import { withExecutionTimeLogging } from 'shared/src/observability/withExecutionTimeLogging'

const englishLevelScore: Record<EnglishLevel, number> = {
  [EnglishLevel.Fluent]: 4,
  [EnglishLevel.Advanced]: 3,
  [EnglishLevel.Advanced]: 2,
  [EnglishLevel.Intermediary]: 1,
  [EnglishLevel.Beginner]: 0,
}

export const getSubscriberRoles = withExecutionTimeLogging(
  async (subscriber: Subscribers, supabase: SupabaseClient) => {
    type QueryBuilder = ReturnType<ReturnType<typeof supabase.from>['select']>

    const filterBySkill = (skills: string[], query: QueryBuilder) => {
      console.log(skills)
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
    const baseQuery = supabase.from(Entities.Roles).select().eq('ready', true)
    // const filteredBySkill = filterBySkill(subscriber.skills as string[], baseQuery)
    const filteredByEnglish = filterByEnglish(
      subscriber.englishLevel,
      baseQuery
    )
    const filteredByMinimumYears = await filterByExp(
      subscriber.startedWorkingAt,
      filteredByEnglish
    )
    return filteredByMinimumYears?.data as Roles[]
  },
  { name: 'getSubscriberRoles' }
)
