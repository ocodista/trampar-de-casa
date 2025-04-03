import { faker } from '@faker-js/faker'
import { Entities } from 'shared'
import { getPostgresClient } from './src/postgres/getPostgresClient'

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
  const postgres = getPostgresClient()
  try {
    await Promise.all(
      getDescriptionTopics().map(async (descriptionTopic) => {
        const result = await postgres.query(
          `INSERT INTO ${Entities.Topics} (name) VALUES ($1)`,
          [descriptionTopic.name]
        )
        return result.rows
      })
    )
    for (const subscriber of getSubscribers()) {
      const result = await postgres.query(
        `INSERT INTO ${Entities.Subcribers} (email, name, "startedWorkingAt", "skillsId", "englishLevel") 
        VALUES ($1, $2, $3, $4, $5)`,
        [
          subscriber.email,
          subscriber.name,
          subscriber.startedWorkingAt,
          subscriber.skillsId,
          subscriber.englishLevel,
        ]
      )
      if (result.rowCount === 0) throw new Error('Failed to insert subscriber')
    }
    await Promise.all(
      getRoles().map(async (role) => {
        const result = await postgres.query(
          `INSERT INTO ${Entities.Roles} (company, country, description, language, title, currency, "skillsId") 
          VALUES ($1, $2, $3, $4, $5, $6, $7)`,
          [
            role.company,
            role.country,
            role.description,
            role.language,
            role.title,
            role.currency,
            role.skillsId,
          ]
        )
        if (result.rowCount === 0) throw new Error('Failed to insert role')
        return result.rows
      })
    )
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
})()
