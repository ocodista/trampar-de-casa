import { faker } from '@faker-js/faker'
import { EnglishLevel, Prisma, Roles, Subscribers, SupabaseClient } from 'db'
import { Entities } from 'shared'
import { describe, expect, it, vi } from 'vitest'
import { subscriberFactory } from './tests/mocks/factories/subscribers'

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

describe('Email Grouper', () => {
  describe('get subscribers', () => {
    const rangeMock = vi.fn()
    const runGetSubscribers = async (
      supabaseClient: SupabaseClient,
      batchSize: number
    ) => {
      const subscribersBatch = getSubscribers(supabaseClient, batchSize)
      for await (const subscribers of subscribersBatch) {
        undefined
      }
    }
    const eqMock = vi.fn()
    const supabaseClient: SupabaseClient = {
      from: () => ({
        select: () => ({
          in: () => ({
            data: mockRoles,
            error: null,
          }),
          eq: (...args: unknown[]) => ({
            ...eqMock(...args),
            range: (...args: unknown[]) => ({
              ...rangeMock(...args),
              data: null,
            }),
          }),
        }),
      }),
    } as unknown as SupabaseClient

    it('fetches subscribers table in batches of 100 rows', async () => {
      const batchSize = 100

      await runGetSubscribers(supabaseClient, batchSize)

      expect(rangeMock).toBeCalledWith(0, batchSize)
    })
    it('filter by confirmed users', async () => {
      const batchSize = 100

      runGetSubscribers(supabaseClient, batchSize)

      expect(eqMock).toBeCalledWith(isConfirmedField, true)
    })
  })

  describe('for each user', () => {
    describe('find the best roles for user', () => {
      const eqMock = vi.fn()
      const supabaseClient: SupabaseClient = {
        from: () => ({
          select: () => ({
            eq: (...args: unknown[]) => ({
              ...eqMock(...args),
              eq: (...args: unknown[]) => ({
                eq: eqMock(...args),
              }),
            }),
          }),
        }),
      } as unknown as SupabaseClient
      it('get only roles that are ready', async () => {
        await rolesMatchmaking(supabaseClient, subscriberFactory())

        expect(eqMock).toBeCalledWith('ready', true)
      })
      // how make a query fopr seach in json fields?
      it.todo('get roles from db based on subscriber skills')
      it.only('get roles from db based on english level', async () => {
        await rolesMatchmaking(
          supabaseClient,
          subscriberFactory({ englishLevel: EnglishLevel.Advanced })
        )

        expect(eqMock).toBeCalledWith('language', 'English')
      })
    })
    it.todo('create emailProps with { user: { email, id }, roleIds }')
    it.todo(
      'send emailProps { user: { email, id }, roleIds } to emailRendererQueue at RabbitMQ'
    )
  })
})
const rolesMatchmaking = async (
  supabaseClient: SupabaseClient,
  subscriber: Subscribers
) => {
  // supabaseClient.from()
  const language =
    subscriber.englishLevel === EnglishLevel.Advanced ? 'English' : 'Portuguese'
  supabaseClient.from('').select('*').eq('ready', true).eq('language', language)
}

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

const isConfirmedField = 'isConfirmed'
async function* getSubscribers(supabase: SupabaseClient, batchSize: number) {
  let start = 0
  while (true) {
    const { data } = await supabase
      .from(Entities.Subcribers)
      .select('*')
      .eq(isConfirmedField, true)
      .range(start, start + batchSize)
    if (data === null) break

    yield data
    start += batchSize
  }
}
