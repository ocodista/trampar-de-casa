import { Collection, Document, MongoClient } from 'mongodb'
import * as sharedFile from 'shared'
import { vi } from 'vitest'

const collectionStub = vi.fn()
const findOneStub = vi.fn()
export const collectionMock = {
  findOne: findOneStub,
} as unknown as Collection<Document>
export const mockMongoDb = () => {
  collectionStub.mockReturnValue(collectionMock)
  vi.spyOn(sharedFile, 'getMongoConnection').mockImplementation(
    async () =>
      ({
        db: () => ({
          collection: collectionStub,
        }),
      } as unknown as MongoClient)
  )

  return { collectionStub, collectionMock, findOneStub }
}
