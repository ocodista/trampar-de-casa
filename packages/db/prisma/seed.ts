import { faker } from '@faker-js/faker'
import { skillArray } from 'shared'
import { Prisma, PrismaClient } from './client'

const prisma = new PrismaClient()

const getSubscribers = (): Prisma.SubscribersCreateInput[] => [
  {
    email: faker.internet.email(),
    englishLevel: 'Advanced',
    name: 'Foo',
    startedWorkingAt: new Date(),
    skillsId: [],
  },
  {
    email: faker.internet.email(),
    englishLevel: 'Beginner',
    name: 'Bar',
    startedWorkingAt: new Date(),
    skillsId: [],
  },
]

const getRoles = (): Prisma.RolesCreateInput[] => [
  {
    company: faker.company.name(),
    country: 'USA',
    description: 'Some description',
    language: 'English',
    title: 'Software Engineer',
    currency: 'USD',
    skillsId: []
  },
  {
    company: faker.company.name(),
    country: 'Brasil',
    description: 'Some description',
    language: 'English',
    title: 'Software Developer Jr',
    currency: 'BRL',
    skillsId: []
  },
]

const getDescriptionTopics = (): Prisma.TopicsCreateInput[] => [
  { name: 'Vagas internacionais' },
  { name: 'Vagas nacionais' },
]

void (async function () {
  try {
    await Promise.all(
      getDescriptionTopics().map(async (descriptionTopic) => {
        await prisma.topics.upsert({ 
          where: {
            name: descriptionTopic.name
          },
          create: descriptionTopic,
          update: {} 
        })
      })
    )
    const subscribers = await Promise.all(
      getSubscribers().map((subscriber) =>
        prisma.subscribers.create({ data: subscriber })
      )
    )
    // const companies = await Promise.all(
    //   getCompanies().map((company) =>
    //     prisma.companies.create({ data: company })
    //   )
    // )
    await Promise.all(
      getRoles().map((role) => prisma.roles.create({ data: role }))
    )
    skillArray.forEach(async (skill, index) => {
      try {
        await prisma.skills.create({
          data: {
            id: index,
            name: skill
          },
        })
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
    await prisma.$disconnect()
    process.exit(1)
  }
})()
