import { faker } from '@faker-js/faker'
import * as redisFile from 'redis'
import { RedisPrefix } from 'shared/src/enums/redis'
import { redisDelStub, redisStub } from 'shared/src/test/helpers/stubs'
import { rolesValidator } from 'src/rolesValidator'
import { vi } from 'vitest'
import * as getRolesFile from '../getRoles'

const getRolesStub = vi.fn()

describe('Roles Validator', () => {
  beforeAll(() => {
    vi.spyOn(redisFile, 'createClient').mockImplementation(redisStub)

    vi.spyOn(getRolesFile, 'getRoles').mockImplementation(getRolesStub)
  })
  afterEach(() => {
    vi.clearAllMocks()
  })
  it('getRoles array', async () => {
    getRolesStub.mockResolvedValue([])

    await rolesValidator()

    expect(getRolesStub).toBeCalled()
  })
  describe('each roles', () => {
    it('removes roles from Redis that are not ready in the database', async () => {
      const id = faker.string.uuid()
      getRolesStub.mockResolvedValue([{ id, ready: false }])

      await rolesValidator()

      expect(redisDelStub).toBeCalledWith(`${RedisPrefix.RolesRenderer}${id}`)
    })

    it('keeps roles in Redis that are ready in the database', async () => {
      const id = faker.string.uuid()
      getRolesStub.mockResolvedValue([{ id, ready: true }])

      await rolesValidator()

      expect(redisDelStub).not.toBeCalled()
    })
  })
})
