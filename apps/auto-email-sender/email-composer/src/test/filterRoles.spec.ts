import { faker } from '@faker-js/faker'
import * as redisFile from 'redis'
import {
  redisConnectStub,
  redisDisconnectStub,
  redisGetStub,
  redisStub,
} from 'shared/src/test/helpers/stubs'
import { getHtmlRoles } from 'src/getHtmlRoles'
import { expect, vi } from 'vitest'

describe('filter roles', () => {
  beforeEach(() => {
    vi.spyOn(redisFile, 'createClient').mockImplementation(redisStub)
  })
  it('establish connection with redis', async () => {
    await getHtmlRoles([faker.string.sample()])

    expect(redisConnectStub).toBeCalled()
  })
  it('break connection with redis', async () => {
    await getHtmlRoles([faker.string.sample()])

    expect(redisDisconnectStub).toBeCalled()
  })
  it('concatenate roles taken on redis', async () => {
    const rolesIdArray = [faker.string.uuid(), faker.string.uuid()]
    const firstRoleHTML = faker.string.sample()
    const twoRoleHTML = faker.string.sample()
    redisGetStub.mockResolvedValueOnce(firstRoleHTML)
    redisGetStub.mockResolvedValueOnce(twoRoleHTML)

    const concatenatedRoles = await getHtmlRoles(rolesIdArray)

    expect(concatenatedRoles).toStrictEqual(`${firstRoleHTML}${twoRoleHTML}`)
  })
})
