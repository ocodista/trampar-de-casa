import { faker } from '@faker-js/faker'
import * as getRolesFile from 'db/src/supabase/domains/roles/getRoles'
import { Collection, Document, MongoClient } from 'mongodb'
import * as redisFile from 'redis'
import * as sharedFile from 'shared'
import { Topics } from 'shared'
import { redisDelStub } from 'shared/src/test/helpers/stubs'
import { rolesValidator } from 'src/rolesValidator'
import { vi } from 'vitest'
import * as isValidRoleFile from '../isValidRole'

const isValidRoleStub = vi.fn()
const getRolesStub = vi.fn()
const testSetup = () => {
  vi.spyOn(isValidRoleFile, 'isValidRole').mockImplementation(isValidRoleStub)
  vi.spyOn(getRolesFile, 'getRoles').mockImplementation(getRolesStub)
  vi.spyOn(console, 'error').mockImplementation(() => vi.fn())
}

const roleDataReturnFactory = (topicId?: Topics) => [
  {
    id: faker.string.uuid(),
    url: faker.internet.url(),
    title: faker.person.jobTitle(),
    topicId: topicId || faker.helpers.enumValue(Topics),
  },
]

describe('Roles Validator', () => {
  const mockMongoCollection = {
    insertOne: vi.fn(),
    updateOne: vi.fn(),
    deleteOne: vi.fn(),
    find: vi.fn(),
    findOne: vi.fn(),
  } as unknown as Collection<Document>
  const mockMongoConnection = {
    db: vi.fn().mockReturnValue({
      collection: vi.fn().mockReturnValue(mockMongoCollection),
    }),
    close: vi.fn(),
  }
  vi.spyOn(sharedFile, 'getMongoConnection').mockImplementation(
    async () => mockMongoConnection as unknown as MongoClient
  )

  const redisClientMock = {
    del: redisDelStub,
  } as unknown as redisFile.RedisClientType
  beforeAll(testSetup)
  afterEach(() => {
    vi.clearAllMocks()
  })
  it('call getRoles', async () => {
    getRolesStub.mockResolvedValue([])

    await rolesValidator(mockMongoCollection)

    expect(getRolesStub).toBeCalled()
  })
  describe('for each role', () => {
    it('remove role from Redis that are not valid on site', async () => {
      const roleDataMock = roleDataReturnFactory(Topics.NATIONAL_VACANCIES)
      getRolesStub.mockResolvedValue(roleDataMock)
      isValidRoleStub.mockResolvedValue(false)

      await rolesValidator(mockMongoCollection)

      expect(mockMongoCollection.deleteOne).toBeCalledWith({
        id: roleDataMock[0].id,
      })
    })

    it('remove role from redis when URL is not valid', async () => {
      const roleDataMock = roleDataReturnFactory(Topics.NATIONAL_VACANCIES)
      getRolesStub.mockResolvedValue(roleDataMock)
      isValidRoleStub.mockImplementation(() => {
        throw new Error(faker.string.sample())
      })

      await rolesValidator(mockMongoCollection)

      expect(mockMongoCollection.deleteOne).toBeCalledWith({
        id: roleDataMock[0].id,
      })
    })

    it('keep role in Redis that are valid on site', async () => {
      const roleDataMock = roleDataReturnFactory()
      getRolesStub.mockResolvedValue(roleDataMock)
      isValidRoleStub.mockResolvedValue(true)

      await rolesValidator(mockMongoCollection)

      expect(mockMongoCollection.deleteOne).not.toBeCalled()
    })
  })
})
