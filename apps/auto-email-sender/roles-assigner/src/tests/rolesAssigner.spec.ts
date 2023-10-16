import * as dbFile from 'db'
import * as getSubscriberRolesFile from 'db/src/domains/roles/getSubscriberRoles'
import * as saveSubscriberRolesFiles from 'db/src/domains/roles/saveSubscriberRoles'
import type { Database } from 'db/src/supabase/type'
import * as redisFile from 'redis'
import { Entities } from 'shared'
import { supabaseClientMock } from 'shared/src/test/helpers/mocks'
import { vi } from 'vitest'
import { assignRoles } from '../rolesAssigner'
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
    const subscribersBatchMock: Database['public']['Tables']['Subscribers']['Row'][] =
      [getSubscriberMock(), getSubscriberMock()]
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

    it('send emailProps {  email, id, roleIds } to emailRendererQueue at Redis', async () => {
      const redisSpy = vi.spyOn(saveSubscriberRolesFiles, 'saveSubscriberRoles')
      await assignRoles()
      expect(redisSpy).toHaveBeenCalled()
    })
  })
})
