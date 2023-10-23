import * as getAllPaginatedFile from 'db/src/supabase/getAllPaginated'
import { mockAsyncGenerator } from 'shared/src/test/helpers/mockAsyncGeneratorFunction'
import { supabaseClientMock } from 'shared/src/test/helpers/mocks'
import { Mock, vi } from 'vitest'

export const getAllPaginatedStub = <Data>(batches: Data[][]): Mock => {
  const getAllPaginatedSpy = vi
    .fn()
    .mockImplementation(() => mockAsyncGenerator(batches))
  vi.spyOn(getAllPaginatedFile, 'getAllPaginated').mockImplementation(
    getAllPaginatedSpy
  )
  return getAllPaginatedSpy
}

export const getSupabaseClientStub = vi.fn().mockReturnValue(supabaseClientMock)
