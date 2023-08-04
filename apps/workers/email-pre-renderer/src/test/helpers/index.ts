import { faker } from '@faker-js/faker'
import * as dbFile from 'db'
import * as redisFile from 'redis'
import * as encryptFile from 'shared'
import * as createRabbitMqChannelFile from 'shared/src/queue/createRabbitMqChannel'
import { getSupabaseClientStub } from 'shared/src/test/helpers/stubs'
import { vi } from 'vitest'
import * as getAllSubscribersFile from '../../getAllSubscribers'
import * as renderFooterFile from '../../renderFooter'
import * as renderHeaderFile from '../../renderHeader'
import * as sendToQueueFile from '../../sendToQueue'
import { getSubscriberMock } from '../factories/subscriberFactory'

export const rolesMock = { rolesId: [faker.string.uuid()] }
export const ENCRYPTED_VALUE_MOCK = faker.string.hexadecimal({ length: 32 })

export const redisGetStub = vi.fn()
export const renderHeaderStub = vi.fn()
export const renderFooterStub = vi.fn()
export const createRabbitMqChannelStub = vi.fn()
export const channelMock = {
  close: vi.fn(),
}
createRabbitMqChannelStub.mockReturnValue(channelMock)
export const sendToQueueStub = vi.fn()
export const getAllSubscribersStub = vi.fn()
export const configExternalServicesMocks = () => {
  redisGetStub.mockResolvedValue(JSON.stringify(rolesMock))
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  vi.spyOn(redisFile, 'createClient').mockImplementation(() => ({
    get: redisGetStub,
    disconnect: vi.fn(),
    connect: vi.fn(),
  }))
  vi.spyOn(getAllSubscribersFile, 'getAllSubscribers').mockImplementation(
    getAllSubscribersStub
  )

  vi.spyOn(
    createRabbitMqChannelFile,
    'createRabbitMqChannel'
  ).mockImplementation(createRabbitMqChannelStub)

  vi.spyOn(dbFile, 'getSupabaseClient').mockImplementation(
    getSupabaseClientStub
  )

  vi.spyOn(sendToQueueFile, 'sendToQueue').mockImplementation(sendToQueueStub)
}
export const mockSupabaseAndRedis = () => {
  const subscriberMock = getSubscriberMock()
  const redisRolesIdMock = { rolesId: [faker.string.sample()] }
  getAllSubscribersStub.mockReturnValue([subscriberMock])
  redisGetStub.mockResolvedValueOnce(JSON.stringify(redisRolesIdMock))

  return { subscriberMock, redisRolesIdMock }
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
