import { faker } from '@faker-js/faker'
import * as getSupabaseClientFile from 'db'
import * as redisFile from 'redis'
import {
  getSupabaseClientStub,
  redisConnectStub,
  redisDisconnectStub,
  redisStub,
} from 'shared/src/test/helpers/stubs'
import { filterRoles } from 'src/filterRoles'
import { vi } from 'vitest'

describe.only('filter roles', () => {
  beforeEach(() => {
    vi.spyOn(redisFile, 'createClient').mockImplementation(redisStub)
    vi.spyOn(getSupabaseClientFile, 'getSupabaseClient').mockImplementation(
      getSupabaseClientStub
    )
  })
  it('establish connection with redis', async () => {
    await filterRoles([faker.string.sample()])

    expect(redisConnectStub).toBeCalled()
  })
  it('break connection with redis', async () => {
    await filterRoles([faker.string.sample()])

    expect(redisDisconnectStub).toBeCalled()
  })
})
