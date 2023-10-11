import { SupabaseClient } from 'db'
import { RedisClientType } from 'redis'
import { vi } from 'vitest'

export const selectStub = vi.fn()

export const supabaseClientMock: SupabaseClient = {
  from: () => ({
    select: (...args: unknown[]) => ({
      ...selectStub(...args),
      range: () => ({
        order: () => ({ data: [] }),
      }),
      eq: () => ({
        range: () => ({
          order: () => ({ data: [] }),
        }),
        eq: () => [],
      }),
    }),
  }),
} as unknown as SupabaseClient

export const redisClientMock: RedisClientType = {
  set: vi.fn(),
  get: vi.fn(),
} as unknown as RedisClientType
