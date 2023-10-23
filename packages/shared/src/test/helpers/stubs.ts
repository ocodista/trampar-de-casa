import { SupabaseTable } from 'db/src/supabase/utilityTypes'
import { supabaseClientMock } from 'shared/src/test/helpers/mocks'
import { Mock, vi } from 'vitest'
import * as getRowsBlockFile from '../../services/getRowsBlock'

type Roles = SupabaseTable<'Roles'>

export const getRowsBlockStub = (roles: Roles[]): Mock => {
  const getRowsBlockSpy = vi
    .fn()
    .mockImplementationOnce(() => new Promise((r) => r(roles)))
    .mockImplementation(() => new Promise((r) => r([])))
  vi.spyOn(getRowsBlockFile, 'getRowsBlock').mockImplementation(getRowsBlockSpy)
  return getRowsBlockSpy
}

export const redisConnectStub = vi.fn()
export const redisSetStub = vi.fn()
export const redisGetStub = vi.fn()
export const redisDisconnectStub = vi.fn()
export const redisDelStub = vi.fn()
export const redisStub = vi.fn().mockReturnValue({
  connect: redisConnectStub,
  set: redisSetStub,
  disconnect: redisDisconnectStub,
  get: redisGetStub,
  del: redisDelStub,
})

export const getSupabaseClientStub = vi.fn().mockReturnValue(supabaseClientMock)
