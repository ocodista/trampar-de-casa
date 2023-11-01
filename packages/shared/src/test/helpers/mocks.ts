import { SupabaseClient } from 'db'
import { RedisClientType } from 'redis'
import { vi } from 'vitest'

export const selectStub = vi.fn()
export const updateStub = vi.fn()
export const eqStub = vi.fn()
eqStub.mockResolvedValue({})

updateStub.mockImplementation(() => ({ eq: eqStub }))

export const supabaseClientMock: SupabaseClient = {
  from: () => ({
    update: updateStub,
    select: (...args: unknown[]) => ({
      ...selectStub(...args),
      range: () => ({
        order: () => ({ data: [] }),
      }),
      eq: () => ({
        eq: () => ({
          range: () => ({
            order: () => ({ data: [] }),
          }),
        }),
      }),
    }),
  }),
} as unknown as SupabaseClient

export const redisClientMock: RedisClientType = {
  set: vi.fn(),
  get: vi.fn(),
} as unknown as RedisClientType
