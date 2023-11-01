import { faker } from '@faker-js/faker'
import * as dbFile from 'db'
import * as getRolesFile from 'db/src/supabase/domains/roles/getRoles'
import { Topics } from 'shared'
import {
  eqStub,
  supabaseClientMock,
  updateStub,
} from 'shared/src/test/helpers/mocks'
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
  vi.spyOn(dbFile, 'getSupabaseClient').mockImplementation(
    () => supabaseClientMock
  )

  beforeAll(testSetup)
  afterEach(() => {
    vi.clearAllMocks()
  })
  it('call getRoles', async () => {
    getRolesStub.mockResolvedValue([])

    await rolesValidator()

    expect(getRolesStub).toBeCalled()
  })
  describe('for each role', () => {
    it('set ready false when role is not valid on site', async () => {
      const roleDataMock = roleDataReturnFactory(Topics.NATIONAL_VACANCIES)
      getRolesStub.mockResolvedValue(roleDataMock)
      isValidRoleStub.mockResolvedValue(false)

      await rolesValidator()

      expect(eqStub).toBeCalledWith('id', roleDataMock[0].id)
      expect(updateStub).toBeCalledWith({
        ready: false,
      })
    })

    it('set ready false when role URL is not valid', async () => {
      const roleDataMock = roleDataReturnFactory(Topics.NATIONAL_VACANCIES)
      getRolesStub.mockResolvedValue(roleDataMock)
      isValidRoleStub.mockImplementation(() => {
        throw new Error(faker.string.sample())
      })

      await rolesValidator()

      expect(eqStub).toBeCalledWith('id', roleDataMock[0].id)
      expect(updateStub).toBeCalledWith({
        ready: false,
      })
    })

    it('keep ready equal true when role are valid on site', async () => {
      const roleDataMock = roleDataReturnFactory()
      getRolesStub.mockResolvedValue(roleDataMock)
      isValidRoleStub.mockResolvedValue(true)

      await rolesValidator()

      expect(eqStub).not.toBeCalled()
      expect(updateStub).not.toBeCalled()
    })
  })
})
