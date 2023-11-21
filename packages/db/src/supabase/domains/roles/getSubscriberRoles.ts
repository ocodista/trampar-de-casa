import { PostgrestFilterBuilder } from '@supabase/postgrest-js'
import { Database, SupabaseClient } from 'db'
import { Entities } from 'shared/src/enums/entities'
import { SupabaseTable } from '../../../supabase/utilityTypes'

type Subscribers = SupabaseTable<'Subscribers'>
type Role = SupabaseTable<'Roles'>

type RoleFilterBuilder = PostgrestFilterBuilder<
  Database['public'],
  Role,
  Role[],
  Database['public']['Tables']['Roles']['Relationships']
>

const readyRoles = (supabase: SupabaseClient<Database>): RoleFilterBuilder =>
  supabase.from(Entities.Roles).select().eq('ready', true)
const top = (limit: number, query: RoleFilterBuilder) => query.limit(limit)

const filterBySkills = (
  skills: string[] | null,
  query: RoleFilterBuilder
): RoleFilterBuilder => {
  if (!skills) return query
  return query.filter('skillsId', 'ov', `{${skills}}`)
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

let topRoles: SupabaseTable<'Roles'>[] | undefined = undefined
const top40Roles = async (supabase: SupabaseClient<Database>) => {
  if (topRoles) return topRoles
  // TODO: Add columns top to roles table so we can choose the top 40 for each release.
  const { data, error } = await top(40, readyRoles(supabase))
  if (error) throw error
  topRoles = data
  return topRoles
}

export const getSubscriberRoles = async (
  { skillsId, startedWorkingAt }: Subscribers,
  supabase: SupabaseClient<Database>
): Promise<SupabaseTable<'Roles'>[]> => {
  if (!skillsId) {
    return await top40Roles(supabase)
  }

  const roles = readyRoles(supabase)
  const skilledRoles = filterBySkills(skillsId, roles)
  const leveledRoles = filterByExp(startedWorkingAt, skilledRoles)
  const { data, error } = await top(40, leveledRoles)
  
  if (error) throw error
  if(!data.length) {
    return await top40Roles(supabase)
  }
  return data
}
