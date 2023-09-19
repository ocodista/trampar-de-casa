import { mockAsyncGenerator } from 'shared/src/test/helpers/mockAsyncGeneratorFunction'
import { supabaseClientMock } from 'shared/src/test/helpers/mocks'
import { Role } from 'src/getSubscriberRoles'
import { Mock, vi } from 'vitest'
import * as getAllPaginatedFile from '../../getAllPaginated'
import * as getRowsBlockFile from '../../getRowsBlock'

export const getAllPaginatedStub = <Data>(batches: Data[][]): Mock => {
  const getAllPaginatedSpy = vi
    .fn()
    .mockImplementation(() => mockAsyncGenerator(batches))
  vi.spyOn(getAllPaginatedFile, 'getAllPaginated').mockImplementation(
    getAllPaginatedSpy
  )
  return getAllPaginatedSpy
}

export const getRowsBlockStub = (roles: Role[]): Mock => {
  const getRowsBlockSpy = vi
    .fn()
    .mockImplementationOnce(() => new Promise((r) => r(roles)))
    .mockImplementation(() => new Promise((r) => r([])))
  vi.spyOn(getRowsBlockFile, 'getRowsBlock').mockImplementation(getRowsBlockSpy)
  return getRowsBlockSpy
}

const redisConnectStub = vi.fn()
const redisSetStub = vi.fn()
export const redisStub = vi.fn().mockReturnValue({
  connect: redisConnectStub,
  set: redisSetStub,
  disconnect: vi.fn(),
})

export const getSupabaseClientStub = vi.fn().mockReturnValue(supabaseClientMock)
