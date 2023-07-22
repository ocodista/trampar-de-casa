import { SupabaseClient } from 'db'
import { Entities } from 'shared'
import { Mock, describe, expect, it, vi } from 'vitest'
import { getRole } from './roleFactory'
import { main } from './rolesGrouper'
import { getSubscriberMock } from './tests/mocks/factories/subscribers'
import { mockAsyncGenerator, mockGetAllPaginated } from './mockHelper'
import * as dbFile from 'db'
import * as getSubscriberRolesFile from './getSubscriberRoles'
import * as redisFile from 'redis'

const readyRole = getRole({ ready: true })
const notReadyRole = getRole({ ready: false })
const supabaseClientMock: SupabaseClient = {
  from: vi.fn(),
} as unknown as SupabaseClient
const getSupabaseClientMock = vi.fn().mockReturnValue(supabaseClientMock)
const redisConnectMock = vi.fn()
const redisMock = vi.fn().mockReturnValue({ connect: redisConnectMock })

describe('Roles Grouper', () => {
  beforeEach(() => {
    vi.spyOn(dbFile, 'getSupabaseClient').mockImplementation(
      getSupabaseClientMock
    )
    vi.spyOn(redisFile, 'createClient').mockImplementation(redisMock)
  })

  it('get subscribers in batches of 100 rows', async () => {
    const getAllPaginatedSpy = mockGetAllPaginated([])
    await main()
    expect(getAllPaginatedSpy).toBeCalledWith({
      supabase: supabaseClientMock,
      entity: Entities.Subcribers,
      batchSize: 100,
    })
  })

  describe('for each subscriber', () => {
    const getSubscribersRoleSpy = vi.fn()
    const subscribersBatchMock: dbFile.Subscribers[] = [
      getSubscriberMock(),
      getSubscriberMock(),
    ]
    beforeAll(() => {
      vi.spyOn(getSubscriberRolesFile, 'getSubscriberRoles').mockImplementation(
        getSubscribersRoleSpy
      )
      mockGetAllPaginated([subscribersBatchMock])
    })

    it('get personalized roles', async () => {
      await main()
      expect(getSubscribersRoleSpy).toBeCalledWith(
        subscribersBatchMock[0],
        supabaseClientMock
      )
      expect(getSubscribersRoleSpy).toBeCalledWith(
        subscribersBatchMock[1],
        supabaseClientMock
      )
      expect(getSubscribersRoleSpy).toBeCalledTimes(subscribersBatchMock.length)
    })

    it.todo('create emailProps with { user: { email, id }, roleIds }')
    it.todo(
      'send emailProps { user: { email, id }, roleIds } to emailRendererQueue at RabbitMQ'
    )
  })
})

// const rolesMatchmaking = async (
//   supabaseClient: SupabaseClient,
//   subscriber: Subscribers
// ) => {
//   // supabaseClient.from()
//   const language =
//     subscriber.englishLevel === EnglishLevel.Advanced ? 'English' : 'Portuguese'
//   supabaseClient.from('').select('*').eq('ready', true).eq('language', language)
// }

// describe('Roles validator', () => {
//   it.todo('must run on the day of the send and before the emailRenderer')
//   it.todo('gets all "ready" roles from DB')
//   describe('For Each Role', () => {
//     it.todo('checks if role is valid')
//     it.todo('deletes from redis if role is not valid')
//     it.todo('do not deletes from redis if role is not valid')
//   })
// })

// describe('Email Renderer', () => {
//   it.todo('consume emailRenderer RabbitMQ queue')
//   describe('For each consumed item of emailRendererQueue', () => {
//     it.todo('iterates over roleIds')
//     it.todo('generates unsubscribe url using userID')

//     describe('For each role id', () => {
//       it.todo('get value from redis using roleID')
//       describe('if roleHTML is not found', () => {
//         it.todo("ignores roleId, don't append nothing to emailHTML")
//       })
//       describe('if roleHTML is found', () => {
//         it.todo('appends roleHTML to emailHTML')
//       })
//     })
//     // program already have { userEmail, rolesHTML }
//     it.todo(
//       'send { userEmail, rolesHTML, unsubscribeURL } to emailSender queue'
//     )
//   })
// })

// describe('Email Sender', () => {
//   // Easy version (Can be started in only one instance!)
//   // Otherwise it will hit the rate limit of Resend API (25 reqs/s)
//   it.todo('renders headerHTML')
//   it.todo('renders footerHTML')
//   it.todo('consumes emailSenderQueue from RabbitMQ')

//   describe('For Each message', () => {
//     // { userEmail, rolesHTML, unsubscribeURL } + headerHTML + footerHTML
//     it.todo('creates full email html')
//     it.todo('adds List-Unsubscribe header to resend')
//     it.todo('send email to user with fullHTML + List-Unsubscribe header')

//     it.todo('re-adds email to queue if failed (maximum 3 times)')
//   })

//   // Complex version
//   describe.todo('Complex version', () => {
//     it.todo('uses broker with 25 messages/s rate')
//     it.todo('renders footer and header only once and store it to redis')
//     it.todo('consumes footer/header from redis on each instance')
//     it.todo('can run multiple instances')
//   })
// })
