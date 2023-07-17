import { faker } from '@faker-js/faker'
import { Prisma, Subscribers } from 'db'
import { describe, it } from 'vitest'

const subscribersFactory = (length = 1) =>
  Array.from(
    { length },
    () =>
      ({
        email: faker.internet.email(),
        skills: [] as Prisma.JsonValue,
        id: faker.string.uuid(),
      } as Subscribers)
  )

it.todo('getUsersInBatches')
describe.todo('matchSubscriberWithRoles', () => {
  it.todo('return user id with roles')
})
