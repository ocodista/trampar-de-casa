import { faker } from '@faker-js/faker'
import { Prisma, Subscribers } from 'db'
export const subscribersFactory = (length = 1) =>
  Array.from(
    { length },
    () =>
      ({
        email: faker.internet.email(),
        skills: [] as Prisma.JsonValue,
        id: faker.string.uuid(),
      } as Subscribers)
  )
