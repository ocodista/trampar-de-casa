import { faker } from '@faker-js/faker'
import { RoleLanguage } from 'db'
import { Role } from 'src/getSubscriberRoles'

export const getRoleMock = (overridableProps?: Partial<Role>): Role => ({
  id: faker.string.uuid(),
  country: faker.location.country(),
  skillsId: [],
  minimumYears: null,
  company: '',
  currency: faker.string.uuid(),
  language: faker.helpers.enumValue(RoleLanguage),
  createdAt: new Date('2023-07-11 14:11:57.386'),
  description: faker.hacker.phrase(),
  ready: true,
  salary: faker.string.uuid(),
  title: faker.company.buzzNoun(),
  updatedAt: new Date('2023-07-11 14:11:57.386'),
  url: '',
  ...(overridableProps || {}),
})

export const getRoleMockArray = (length = 1) =>
  Array.from({ length }, () => getRoleMock())
