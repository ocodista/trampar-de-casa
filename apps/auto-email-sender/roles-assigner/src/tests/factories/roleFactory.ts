import { faker } from '@faker-js/faker'
import { SupabaseTable } from 'db/src/supabase/utilityTypes'
import { Topics } from 'shared'

type Role = SupabaseTable<'Roles'>

enum RoleLanguage {
  English = 'English',
  Portuguese = 'Portuguese',
}

export const getRoleMock = (overridableProps?: Partial<Role>): Role => ({
  id: faker.string.uuid(),
  country: faker.location.country(),
  skillsId: [],
  minimumYears: null,
  company: '',
  currency: faker.string.uuid(),
  language: faker.helpers.enumValue(RoleLanguage),
  createdAt: faker.date.past().toISOString(),
  description: faker.hacker.phrase(),
  ready: true,
  salary: faker.string.uuid(),
  title: faker.company.buzzNoun(),
  updatedAt: faker.date.recent().toISOString(),
  url: '',
  sentRolesId: null,
  topicId: faker.helpers.enumValue(Topics),
  ...(overridableProps || {}),
})

export const getRoleMockArray = (length = 1) =>
  Array.from({ length }, () => getRoleMock())
