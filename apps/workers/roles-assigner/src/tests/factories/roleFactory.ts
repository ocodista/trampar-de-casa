import { faker } from '@faker-js/faker'
import { Prisma, RoleLanguage, Roles } from 'db'

export const getRoleMock = (overridableProps?: Partial<Roles>): Roles => ({
  id: faker.string.uuid(),
  companyId: faker.string.uuid(),
  country: faker.location.country(),
  skills: [] as Prisma.JsonValue,
  currency: faker.string.uuid(),
  language: faker.helpers.enumValue(RoleLanguage),
  createdAt: new Date('2023-07-11 14:11:57.386'),
  description: faker.hacker.phrase(),
  ready: true,
  salary: faker.string.uuid(),
  sentRolesId: null,
  title: faker.company.buzzNoun(),
  updatedAt: new Date('2023-07-11 14:11:57.386'),
  url: '',
  ...(overridableProps || {}),
})

export const getRoleMockArray = (length = 1) =>
  Array.from({ length }, () => getRoleMock())
