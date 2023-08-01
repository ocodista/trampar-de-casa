import { SupabaseClient } from 'db'
import { RedisClientType } from 'redis'
import { vi } from 'vitest'

export const supabaseClientMock: SupabaseClient = {
  from: () => ({
    select: () => ({
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
