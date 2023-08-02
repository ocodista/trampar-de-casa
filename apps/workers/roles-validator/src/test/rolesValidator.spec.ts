import { faker } from '@faker-js/faker'
import * as redisFile from 'redis'
import { RedisPrefix } from 'shared/src/enums/redis'
import { redisDelStub } from 'shared/src/test/helpers/stubs'
import { rolesValidator } from 'src/rolesValidator'
import { vi } from 'vitest'
import * as getRolesFile from '../getRoles'
import * as isValidRoleFile from '../isValidRole'

const isValidRoleStub = vi.fn()
const getRolesStub = vi.fn()
const testSetup = () => {
  vi.spyOn(isValidRoleFile, 'isValidRole').mockImplementation(isValidRoleStub)
  // vi.spyOn(redisFile, 'createClient').mockImplementation(redisStub)
  vi.spyOn(getRolesFile, 'getRoles').mockImplementation(getRolesStub)
}

const roleDataReturnFactory = () => [
  {
    id: faker.string.uuid(),
    url: faker.internet.url(),
    title: faker.person.jobTitle(),
  },
]

describe('Roles Validator', () => {
  const redisClientMock = {
    del: redisDelStub,
  } as unknown as redisFile.RedisClientType
  beforeAll(testSetup)
  afterEach(() => {
    vi.clearAllMocks()
  })
  it('call getRoles', async () => {
    getRolesStub.mockResolvedValue([])

    await rolesValidator(redisClientMock)

    expect(getRolesStub).toBeCalled()
  })
  describe('for each role', () => {
    it('remove role from Redis that are not valid on site', async () => {
      const roleDataMock = roleDataReturnFactory()
      getRolesStub.mockResolvedValue(roleDataMock)
      isValidRoleStub.mockResolvedValue(false)
      const expectedDeletedKey = `${RedisPrefix.RolesRenderer}${roleDataMock[0].id}`

      await rolesValidator(redisClientMock)

      expect(redisDelStub).toBeCalledWith(expectedDeletedKey)
    })

    it('remove role from redis when URL is not valid', async () => {
      const roleDataMock = roleDataReturnFactory()
      getRolesStub.mockResolvedValue(roleDataMock)
      isValidRoleStub.mockImplementation(() => {
        throw new Error(faker.string.sample())
      })
      const expectedDeletedKey = `${RedisPrefix.RolesRenderer}${roleDataMock[0].id}`

      await rolesValidator(redisClientMock)

      expect(redisDelStub).toBeCalledWith(expectedDeletedKey)
    })

    it('keep role in Redis that are valid on site', async () => {
      const roleDataMock = roleDataReturnFactory()
      getRolesStub.mockResolvedValue(roleDataMock)
      isValidRoleStub.mockResolvedValue(true)

      await rolesValidator(redisClientMock)

      expect(redisDelStub).not.toBeCalled()
    })
  })
})
