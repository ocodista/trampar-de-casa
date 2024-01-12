'use server'
import { faker } from '@faker-js/faker'
import { Database } from 'db/src/supabase/type'
import { skillArray } from 'shared'
import { Topics } from 'shared/src/enums/topics'
type RolesSkillsView = Database['public']['Views']['RolesSkillsView']['Row']

export const getFakeRoles = (
  topic: Topics = Topics.NATIONAL_VACANCIES
): RolesSkillsView =>
  ({
    id: faker.string.uuid(),
    companyName: faker.company.name(),
    country: faker.location.country(),
    createdAt: faker.date.past(),
    currency: 'N/A',
    description: `A partir de $${faker.number.float({
      min: 1000,
      max: 6000,
      precision: 2,
    })}`,
    language: faker.helpers.arrayElement(['Inglês', 'Português']),
    ready: faker.datatype.boolean(),
    salary: `A partir de $${faker.number.float({
      min: 1000,
      max: 6000,
      precision: 2,
    })}`,
    skillNames: faker.helpers
      .arrayElements(skillArray, 2)
      .map(({ name }) => name),
    title: faker.person.jobTitle(),
    topicId: topic,
    url: faker.internet.url(),
    company: faker.company.name(),
  } as unknown as RolesSkillsView)
