import * as dbFile from 'db'
import * as redisFile from 'redis'
import { Entities } from 'shared'
import { supabaseClientMock } from 'shared/src/test/helpers/mocks'
import { vi } from 'vitest'
import * as getSubscriberRolesFile from '../getSubscriberRoles'
import { assignRoles } from '../rolesAssigner'
import * as saveSubscriberRolesFiles from '../saveSubscriberRoles'
import { getRoleMock } from './factories/roleFactory'
import { getSubscriberMock } from './factories/subscriberFactory'
import {
  getAllPaginatedStub,
  getSupabaseClientStub,
  redisStub,
} from './helpers/stubs'

const readyRole = getRoleMock({ ready: true })
const notReadyRole = getRoleMock({ ready: false })

describe('Roles Assigner', () => {
  beforeEach(() => {
    vi.spyOn(dbFile, 'getSupabaseClient').mockImplementation(
      getSupabaseClientStub
    )
    vi.spyOn(redisFile, 'createClient').mockImplementation(redisStub)
  })

  it('get subscribers in batches of 100 rows', async () => {
    const getAllPaginatedSpy = getAllPaginatedStub([])
    await assignRoles()
    expect(getAllPaginatedSpy).toBeCalledWith({
      supabase: supabaseClientMock,
      entity: Entities.Subcribers,
      batchSize: 100,
    })
  })

  describe('for each subscriber', () => {
    const rolesMock = [readyRole, notReadyRole]
    const getSubscribersRoleSpy = vi.fn().mockReturnValue(rolesMock)
    const subscribersBatchMock: dbFile.Subscribers[] = [
      getSubscriberMock(),
      getSubscriberMock(),
    ]
    beforeAll(() => {
      vi.spyOn(getSubscriberRolesFile, 'getSubscriberRoles').mockImplementation(
        getSubscribersRoleSpy
      )
      getAllPaginatedStub([subscribersBatchMock])
    })

    it('get personalized roles', async () => {
      await assignRoles()
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

    it('send emailProps { user: { email, id }, roleIds } to emailRendererQueue at Redis', async () => {
      const redisSpy = vi.spyOn(saveSubscriberRolesFiles, 'saveSubscriberRoles')
      await assignRoles()
      expect(redisSpy).toHaveBeenCalled()
    })
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
