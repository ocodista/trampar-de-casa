import { faker } from '@faker-js/faker'
import * as dbFile from 'db'
import * as getSubscriberRolesFile from 'db/src/supabase/domains/roles/getSubscriberRoles'
import * as getAllPaginatedFile from 'db/src/supabase/domains/subscribers/getAllConfirmedSubscribersPaginated'
import { SupabaseTable } from 'db/src/supabase/utilityTypes'
import { Collection, MongoClient } from 'mongodb'
import * as sharedFile from 'shared'
import { supabaseClientMock } from 'shared/src/test/helpers/mocks'
import { channelMock, getStub } from 'shared/src/test/helpers/rabbitMQ'
import { vi } from 'vitest'
import { assignRoles } from '../rolesAssigner'
import { getRoleMock } from './factories/roleFactory'
import { getSubscriberMock } from './factories/subscriberFactory'
import { getSupabaseClientStub } from './helpers/stubs'
type Subscribers = SupabaseTable<'Subscribers'>

// mock process.exit
vi.spyOn(process, 'exit').mockImplementation(vi.fn())

const mockSubscribersGenerator = (responseChunks: Array<Subscribers[]>) => {
  const getAllPaginatedStub = vi.spyOn(
    getAllPaginatedFile,
    'getAllConfirmedSubscribersPaginated'
  )
  getAllPaginatedStub.mockImplementation(async function* () {
    for (const chunk of responseChunks) {
      yield chunk
    }
  })

  return { getAllPaginatedStub }
}

const readyRole = getRoleMock({ ready: true })
const notReadyRole = getRoleMock({ ready: false })
vi.mock('mongodb', () => {
  return {
    Collection: vi.fn(),
    Document: vi.fn(),
    MongoClient: class MongoClient {
      public connect() {
        return {
          db: () => ({
            collection: () => ({
              insertOne: vi.fn(),
            }),
          }),
          Document: vi.fn(),
          close: vi.fn(),
        }
      }
    },
    ServerApiVersion: {
      v1: 'v1',
    },
  }
})
describe('Roles Assigner', () => {
  const mockMongoCollection = {
    insertOne: vi.fn(),
    updateOne: vi.fn(),
    deleteOne: vi.fn(),
    find: vi.fn(),
    findOne: vi.fn(),
  } as unknown as Collection<Document>

  beforeEach(() => {
    vi.spyOn(dbFile, 'getSupabaseClient').mockImplementation(
      getSupabaseClientStub
    )
    const mockMongoConnection = {
      db: vi.fn().mockReturnValue({
        collection: vi.fn().mockReturnValue(mockMongoCollection),
      }),
      close: vi.fn(),
    }
    vi.spyOn(sharedFile, 'getMongoConnection').mockImplementation(
      async () => mockMongoConnection as unknown as MongoClient
    )
  })

  describe('for each subscriber', () => {
    const rolesMock = [readyRole, notReadyRole]
    const getSubscribersRoleSpy = vi.fn().mockReturnValue(rolesMock)
    const subscribersBatchMock: SupabaseTable<'Subscribers'>[] = [
      getSubscriberMock(),
      getSubscriberMock(),
    ]
    beforeAll(() => {
      vi.spyOn(getSubscriberRolesFile, 'getSubscriberRoles').mockImplementation(
        getSubscribersRoleSpy
      )
    })

    it('get personalized roles', async () => {
      vi.spyOn(sharedFile, 'createRabbitMqChannel').mockImplementation(
        async () => channelMock
      )
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      vi.spyOn(dbFile, 'getSupabaseClient').mockImplementation(
        () => supabaseClientMock
      )
      getStub.mockResolvedValueOnce({
        content: Buffer.from(JSON.stringify(subscribersBatchMock[0])),
      })
      await assignRoles()

      expect(getSubscribersRoleSpy).toBeCalledWith(
        subscribersBatchMock[0],
        supabaseClientMock
      )
    })

    it('send emailProps {  email, id, roleIds } to emailRendererQueue at Redis', async () => {
      const subscriberMock = {
        email: faker.internet.email(),
        id: faker.string.uuid(),
        isConfirmed: true,
      } as Subscribers
      mockSubscribersGenerator([[subscriberMock]])
      await assignRoles()

      expect(mockMongoCollection.insertOne).toHaveBeenCalled()
    })
  })
})
