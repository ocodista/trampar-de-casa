import { Mock, vi } from 'vitest'
import * as getAllPaginatedFile from './getAllPaginated'

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

export const mockGetAllPaginated = <Data>(batches: Data[][]): Mock => {
  const getAllPaginatedSpy = vi
    .fn()
    .mockImplementation(() => mockAsyncGenerator(batches))
  vi.spyOn(getAllPaginatedFile, 'getAllPaginated').mockImplementation(
    getAllPaginatedSpy
  )
  return getAllPaginatedSpy
}
