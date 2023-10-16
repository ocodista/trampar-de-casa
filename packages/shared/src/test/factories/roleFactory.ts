import { faker } from '@faker-js/faker'
import { Database } from 'db'
import { Topics } from '../../enums'

type Roles = Database['public']['Tables']['Roles']['Row']

enum RoleLanguage {
  English = 'English',
  Portuguese = 'Portuguese',
}

export const getRoleMock = (overridableProps?: Partial<Roles>): Roles => ({
  id: faker.string.uuid(),
  country: faker.location.country(),
  skillsId: [],
  company: faker.company.buzzNoun(),
  minimumYears: faker.number.int({ max: 7 }),
  topicId: faker.helpers.enumValue(Topics),
  currency: faker.string.uuid(),
  language: faker.helpers.enumValue(RoleLanguage),
  createdAt: new Date('2023-07-11 14:11:57.386').toISOString(),
  description: faker.hacker.phrase(),
  ready: true,
  salary: faker.string.uuid(),
  sentRolesId: null,
  title: faker.company.buzzNoun(),
  updatedAt: new Date('2023-07-11 14:11:57.386').toISOString(),
  url: '',
  ...(overridableProps || {}),
})

export const getRoleMockArray = (length = 1) =>
  Array.from({ length }, () => getRoleMock())
