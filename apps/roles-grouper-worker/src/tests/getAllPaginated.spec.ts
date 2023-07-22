import { getAllPaginated } from '../getAllPaginated'
import * as getAllPaginatedFile from '../getAllPaginated'
import * as dbFile from 'db'
import { Roles } from 'db'
import { Entities } from 'shared'
import { vi, beforeEach, afterEach, it } from 'vitest'

// TODO: Fix supabase mock
const supabase = vi.fn().mockReturnValue({ from: () => console.log('lalala') })
const getRowsBlockMock = vi.fn()
let entity: Entities
let batchSize: number

beforeEach(() => {
  vi.spyOn(dbFile, 'getSupabaseClient').mockImplementation(supabase)
  vi.spyOn(getAllPaginatedFile, 'getRowsBlock').mockImplementation(
    getRowsBlockMock
  )
  entity = Entities.Subcribers // Or whatever entity you are testing
  batchSize = 10
})

afterEach(() => {
  vi.clearAllMocks()
})

it('should yield all the data correctly', async () => {
  const mockData = [
    [
      { id: 1, name: 'John Doe' },
      { id: 2, name: 'Jane Doe' },
    ],
    [{ id: 3, name: 'Tom Smith' }],
    [],
  ]

  getRowsBlockMock.mockImplementation(async () => {
    return mockData.shift()
  })

  const data: Roles[] = []
  for await (const roles of getAllPaginated({
    supabase: supabase as unknown as dbFile.SupabaseClient,
    entity,
    batchSize,
  })) {
    data.push(...roles)
  }

  expect(data.length).toBe(3)
  expect(getRowsBlockMock).toBeCalledTimes(3)
  expect(data).toEqual([
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Doe' },
    { id: 3, name: 'Tom Smith' },
  ])
})
