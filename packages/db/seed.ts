import { faker } from '@faker-js/faker'
import { Entities, skillArray } from 'shared'
import { getSupabaseClient } from './index'

enum EnglishLevel {
  BEGINNER = 'Beginner',
  INTERMEDIARY = 'Intermediary',
  ADVANCED = 'Advanced',
  FLUENT = 'Fluent'
}
type SubscribersTable = {
  email: string
  name: string
  startedWorkingAt: Date,
  skillsId: Array<string>,
  englishLevel: EnglishLevel
}
type TopicsTable = {
  name: string
}

const getSubscribers = (): SubscribersTable[] => [
  {
    email: faker.internet.email(),
    englishLevel: faker.helpers.enumValue(EnglishLevel),
    name: faker.person.fullName(),
    startedWorkingAt: new Date(),
    skillsId: [],
  },
  {
    email: faker.internet.email(),
    englishLevel: faker.helpers.enumValue(EnglishLevel),
    name: faker.person.fullName(),
    startedWorkingAt: new Date(),
    skillsId: [],
  },
]

const getRoles = () => [
  {
    company: faker.company.name(),
    country: faker.location.country(),
    description: faker.person.jobDescriptor(),
    language: 'English',
    title: faker.person.jobTitle(),
    currency: 'USD',
    skillsId: []
  },
  {
    company: faker.company.name(),
    country: faker.location.country(),
    description: faker.person.jobDescriptor(),
    language: 'English',
    title: faker.person.jobTitle(),
    currency: 'BRL',
    skillsId: []
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
        await supabase.from(Entities.Topics)
          .insert(descriptionTopic)
      })
    )
    await Promise.all(
      getSubscribers().map(async (subscriber) =>
        await supabase.from(Entities.Subcribers)
          .insert(subscriber)
      )
    )
    await Promise.all(
      getRoles().map(async (role) => 
        await supabase.from(Entities.Roles)
          .insert(role)
      )
    )
    skillArray.forEach(async (skill, index) => {
      try {
        const { error } = await supabase.from(Entities.Skills)
          .insert({id: index, name: skill})
        if(error) throw error
      } catch {
        console.log(
          {
            id: index,
            name: skill
          }
        )
      }
    })
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
})()
