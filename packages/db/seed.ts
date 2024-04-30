import { faker } from '@faker-js/faker'
import { Entities } from 'shared'
import { getSupabaseClient } from './index'

enum EnglishLevel {
  BEGINNER = 'Beginner',
  INTERMEDIARY = 'Intermediary',
  ADVANCED = 'Advanced',
  FLUENT = 'Fluent',
}
type SubscribersTable = {
  email: string
  name: string
  startedWorkingAt: Date
  skillsId: Array<string>
  englishLevel: EnglishLevel
}
type TopicsTable = {
  name: string
}

const getSubscribers = (): SubscribersTable[] =>
  Array.from({ length: 9000 }).map(() => ({
    email: faker.internet.email(),
    englishLevel: faker.helpers.enumValue(EnglishLevel),
    name: faker.person.fullName(),
    startedWorkingAt: new Date(),
    skillsId: [],
  }))

const getRoles = () => [
  {
    company: faker.company.name(),
    country: faker.location.country(),
    description: faker.person.jobDescriptor(),
    language: 'English',
    title: faker.person.jobTitle(),
    currency: 'USD',
    skillsId: [],
  },
  {
    company: faker.company.name(),
    country: faker.location.country(),
    description: faker.person.jobDescriptor(),
    language: 'English',
    title: faker.person.jobTitle(),
    currency: 'BRL',
    skillsId: [],
  },
]

const getDescriptionTopics = (): TopicsTable[] => [
  { name: 'Vagas internacionais' },
  { name: 'Vagas nacionais' },
]

void (async function () {
  const supabase = getSupabaseClient()
  try {
    await Promise.all(
      getDescriptionTopics().map(async (descriptionTopic) => {
        await supabase.from(Entities.Topics).insert(descriptionTopic)
      })
    )
    for (const subscriber of getSubscribers()) {
      await supabase.from(Entities.Subscribers).insert(subscriber)
    }
    await Promise.all(
      getRoles().map(
        async (role) => await supabase.from(Entities.Roles).insert(role)
      )
    )
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
})()
