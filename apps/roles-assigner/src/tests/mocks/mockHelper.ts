import { Roles, SupabaseClient } from 'db'
import { Mock, vi } from 'vitest'
import * as getAllPaginatedFile from '../../getAllPaginated'
import * as getRowsBlockFile from '../../getRowsBlock'

export function mockAsyncGenerator<Data = any>(batches: Data[][]) {
  let i = 0
  return {
    [Symbol.asyncIterator]() {
      return this
    },
    next() {
      if (i < batches.length) {
        return Promise.resolve({ value: batches[i++], done: false })
      } else {
        return Promise.resolve({ done: true })
      }
    },
  }
}

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

export const supabaseClientMock: SupabaseClient = {
  from: () => ({
    select: () => ({
      eq: () => ({
        range: () => ({
          order: () => ({ data: [] }),
        }),
      }),
    }),
  }),
} as unknown as SupabaseClient
