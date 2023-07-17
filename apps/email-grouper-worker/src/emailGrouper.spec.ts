import { faker } from '@faker-js/faker'
import { Prisma, Roles, Subscribers, SupabaseClient } from 'db'
import { RedisClientType } from 'redis'
import { describe, it } from 'vitest'

/*** TODO: Remove mocks and factories from this file ***/
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
const roleFactory = (length = 1) =>
  Array.from(
    { length },
    () =>
      ({
        id: faker.string.uuid(),
        companyId: faker.string.uuid(),
        country: faker.location.country(),
        skills: [] as Prisma.JsonValue,
        currency: faker.string.uuid(),
        language: faker.location.countryCode(),
        createdAt: '2023-07-11 14:11:57.386',
        description: faker.hacker.phrase(),
        ready: true,
        salary: faker.string.uuid(),
        sentRolesId: null,
        title: faker.company.buzzNoun(),
        updatedAt: '2023-07-11 14:11:57.386',
        url: '',
      } as unknown as Roles)
  )
const mockRoles = roleFactory(20)

const mockSubscribers = subscribersFactory(10)
const mockSupabaseClient: SupabaseClient = {
  from: () => ({
    select: () => ({
      in: () => ({
        data: mockRoles,
        error: null,
      }),
      eq: () => ({
        range: (start: number, end: number) => ({
          order: () =>
            Promise.resolve({
              data: mockSubscribers.slice(start, end + 1),
              error: null,
            }),
        }),
      }),
    }),
  }),
} as unknown as SupabaseClient
const mockRedisClient: RedisClientType = {
  set: (key: string, value: string, callback: (_a: any, _b: any) => void) => {
    callback && callback(null, 'OK')
    return true
  },
} as unknown as RedisClientType

describe('Email Grouper', () => {
  it.todo("get the subscribers that haven't been matchmaked yet")
  describe('for each user', () => {
    it.todo('find the best roles for user')
    it.todo('create emailProps with { user: { email, id }, roleIds }')
    it.todo(
      'send emailProps { user: { email, id }, roleIds } to emailRendererQueue at RabbitMQ'
    )
  })
})

describe('Roles validator', () => {
  it.todo('must run on the day of the send and before the emailRenderer')
  it.todo('gets all "ready" roles from DB')
  describe('For Each Role', () => {
    it.todo('checks if role is valid')
    it.todo('deletes from redis if role is not valid')
    it.todo('do not deletes from redis if role is not valid')
  })
})

describe('Email Renderer', () => {
  it.todo('consume emailRenderer RabbitMQ queue')
  describe('For each consumed item of emailRendererQueue', () => {
    it.todo('iterates over roleIds')
    it.todo('generates unsubscribe url using userID')

    describe('For each role id', () => {
      it.todo('get value from redis using roleID')
      describe('if roleHTML is not found', () => {
        it.todo("ignores roleId, don't append nothing to emailHTML")
      })
      describe('if roleHTML is found', () => {
        it.todo('appends roleHTML to emailHTML')
      })
    })
    // program already have { userEmail, rolesHTML }
    it.todo(
      'send { userEmail, rolesHTML, unsubscribeURL } to emailSender queue'
    )
  })
})

describe('Email Sender', () => {
  // Easy version (Can be started in only one instance!)
  // Otherwise it will hit the rate limit of Resend API (25 reqs/s)
  it.todo('renders headerHTML')
  it.todo('renders footerHTML')
  it.todo('consumes emailSenderQueue from RabbitMQ')

  describe('For Each message', () => {
    // { userEmail, rolesHTML, unsubscribeURL } + headerHTML + footerHTML
    it.todo('creates full email html')
    it.todo('adds List-Unsubscribe header to resend')
    it.todo('send email to user with fullHTML + List-Unsubscribe header')

    it.todo('re-adds email to queue if failed (maximum 3 times)')
  })

  // Complex version
  describe.todo('Complex version', () => {
    it.todo('uses broker with 25 messages/s rate')
    it.todo('renders footer and header only once and store it to redis')
    it.todo('consumes footer/header from redis on each instance')
    it.todo('can run multiple instances')
  })
})
