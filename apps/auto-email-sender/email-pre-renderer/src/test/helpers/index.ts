import { faker } from '@faker-js/faker'
import { MongoClient } from 'mongodb'
import * as encryptFile from 'shared'
import * as sharedFile from 'shared'
import * as createRabbitMqChannelFile from 'shared/src/queue/createRabbitMqConnection'
import { channelMock } from 'shared/src/test/helpers/rabbitMQ'
import { vi } from 'vitest'
import * as renderFooterFile from '../../renderFooter'
import * as renderHeaderFile from '../../renderHeader'
import { getSubscriberMock } from '../factories/subscriberFactory'

export const rolesMock = { rolesId: [faker.string.uuid()] }
export const ENCRYPTED_VALUE_MOCK = faker.string.hexadecimal({ length: 32 })

export const renderHeaderStub = vi.fn()
export const renderFooterStub = vi.fn()
export const createRabbitMqChannelStub = vi.fn()
export const createRabbitMqConnectionStub = vi.fn()
createRabbitMqConnectionStub.mockImplementation(async () => ({
  createChannel: async () => channelMock,
}))
export const sendToQueueStub = vi.fn()
createRabbitMqChannelStub.mockReturnValue(channelMock)
export const getAllSubscribersStub = vi.fn()

export const mockExternalServices = () => {
  vi.spyOn(
    createRabbitMqChannelFile,
    'createRabbitMqConnection'
  ).mockImplementation(createRabbitMqConnectionStub)

  const subscriberMock = getSubscriberMock()
  const findOneStub = vi.fn()
  getAllSubscribersStub.mockReturnValue([subscriberMock])
  const mongoRoleAssignerMock = {
    email: faker.internet.email(),
    id: faker.string.uuid(),
    rolesId: ['FAKE_INLINE_HTML_ROLE'],
  }
  const mongoCollectionMock = {
    insertOne: vi.fn(),
    updateOne: vi.fn(),
    deleteOne: vi.fn(),
    find: vi.fn(),
    findOne: findOneStub.mockResolvedValueOnce(mongoRoleAssignerMock),
  }
  const mongoConnectionMock = {
    db: vi.fn().mockReturnValue({
      collection: vi.fn().mockReturnValue(mongoCollectionMock),
    }),
    close: vi.fn(),
  }
  vi.spyOn(sharedFile, 'getMongoConnection').mockImplementation(
    async () => mongoConnectionMock as unknown as MongoClient
  )
  return {
    mongoCollectionMock,
    subscriberMock,
    mongoConnectionMock,
    mongoRoleAssignerMock,
    findOneStub,
    createRabbitMqChannelStub,
    createRabbitMqConnectionStub,
    sendToQueueStub,
  }
}
export const configRenderMocks = () => {
  vi.spyOn(encryptFile, 'encrypt').mockImplementation(
    () => ENCRYPTED_VALUE_MOCK
  )
  vi.spyOn(renderFooterFile, 'renderFooter').mockImplementation(
    renderFooterStub
  )
  vi.spyOn(renderHeaderFile, 'renderHeader').mockImplementation(
    renderHeaderStub
  )
}
