import { faker } from '@faker-js/faker'
import { EnglishLevel, Subscribers } from 'db'

export const getSubscriberMock = (subscribers: Partial<Subscribers> = {}) =>
  ({
    email: faker.internet.email(),
    createdAt: faker.date.past(),
    englishLevel: faker.helpers.enumValue(EnglishLevel),
    gitHub: faker.internet.url(),
    linkedInUrl: faker.internet.url(),
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    skills: [faker.hacker.noun()],
    isConfirmed: true,
    optOut: false,
    startedWorkingAt: faker.date.past(),
    updatedAt: new Date(),
    ...subscribers,
  } as Subscribers)

export const subscribersFactory = (length = 1) => {
  return Array.from({ length }, () => getSubscriberMock())
}
