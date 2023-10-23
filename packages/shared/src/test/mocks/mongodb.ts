import { vi } from 'vitest'

vi.mock('mongodb', () => {
  return {
    Collection: vi.fn(),
    Document: vi.fn(),
    MongoClient: class MongoClient {
      public connect() {
        return {
          db: () => ({
            collection: vi.fn(),
          }),
          Document: vi.fn(),
          close: vi.fn(),
        }
      }
    },
  }
})
