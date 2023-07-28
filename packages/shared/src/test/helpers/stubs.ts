import { Roles } from 'db'
import { mockAsyncGenerator } from 'shared/src/test/helpers/mockAsyncGeneratorFunction'
import { supabaseClientMock } from 'shared/src/test/helpers/mocks'
import { Mock, vi } from 'vitest'
import * as getAllPaginatedFile from '../../services/getAllPaginated'
import * as getRowsBlockFile from '../../services/getRowsBlock'

export const getAllPaginatedStub = <Data>(batches: Data[][]): Mock => {
  const getAllPaginatedSpy = vi
    .fn()
    .mockImplementation(() => mockAsyncGenerator(batches))
  vi.spyOn(getAllPaginatedFile, 'getAllPaginated').mockImplementation(
    getAllPaginatedSpy
  )
  return getAllPaginatedSpy
}

export const getRowsBlockStub = (roles: Roles[]): Mock => {
  const getRowsBlockSpy = vi
    .fn()
    .mockImplementationOnce(() => new Promise((r) => r(roles)))
    .mockImplementation(() => new Promise((r) => r([])))
  vi.spyOn(getRowsBlockFile, 'getRowsBlock').mockImplementation(getRowsBlockSpy)
  return getRowsBlockSpy
}

const redisConnectStub = vi.fn()
const redisSetStub = vi.fn()
const redisGetStub = vi.fn()
export const redisStub = vi.fn().mockReturnValue({
  connect: redisConnectStub,
  set: redisSetStub,
  disconnect: vi.fn(),
  get: redisGetStub,
})

export const getSupabaseClientStub = vi.fn().mockReturnValue(supabaseClientMock)
