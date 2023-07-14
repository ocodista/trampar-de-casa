import { vi, it, describe, expect } from 'vitest'
import { SupabaseClient } from '@supabase/supabase-js'
import { Roles } from 'db'
import { getRolesInBatches } from './getRoles'
import { htmlStartingDoctype, parseHTML } from './parseHTML'
import { RedisClientType } from 'redis'
import { parseAndStoreRole } from './parseAndStoreRole'

const mockRoles: Roles[] = [
  {
    id: '1',
  } as Roles,
]
const mockSupabaseClient: SupabaseClient = {
  from: () => ({
    select: () => ({
      eq: () => ({
        range: (start: number, _end: number) => ({
          order: () =>
            Promise.resolve({
              data: start < mockRoles.length ? mockRoles : [],
              error: null,
            }),
        }),
      }),
    }),
  }),
} as unknown as SupabaseClient

const mockRedisClient: RedisClientType = {
  set: (key: string, value: string, callback: (_a: any, _b: any) => void) => {
    callback && callback(null, 'OK')
    return true
  },
} as unknown as RedisClientType

it('getRolesInBatches', async ({ expect }) => {
  const roleBatches = getRolesInBatches(mockSupabaseClient, 10)
  const batchedRoles = []
  for await (const batch of roleBatches) {
    batchedRoles.push(batch)
  }
  expect(batchedRoles).toEqual([
    mockRoles.slice(0, 10),
    mockRoles.slice(10, 20),
  ])
})

describe('parseHTML', () => {
  it('parses component and return html without the doctype', () => {
    const parsed = parseHTML(mockRoles[0])
    expect(parsed).not.toContain(htmlStartingDoctype)
  })
})

describe('parseAndStoreRole', () => {
  it('parses and stores html in roles:{id} key at Redis', async () => {
    const setSpy = vi.spyOn(mockRedisClient, 'set')
    await parseAndStoreRole(mockRedisClient, mockRoles[0])
    expect(setSpy).toHaveBeenCalledWith(
      `role:${mockRoles[0].id}`,
      parseHTML(mockRoles[0])
    )
    setSpy.mockRestore()
  })
})
