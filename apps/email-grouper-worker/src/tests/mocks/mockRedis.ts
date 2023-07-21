import { RedisClientType } from 'redis'
import { vi } from 'vitest'

export function mockRedis() {
  const setMock = vi.fn()
  const getMock = vi.fn()
  const mockRedisClient: RedisClientType = {
    set: setMock,
    get: getMock,
  } as unknown as RedisClientType

  return { mockRedisClient, setMock, getMock }
}
