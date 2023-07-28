import { faker } from '@faker-js/faker'
import * as dbFile from 'db'
import * as redisFile from 'redis'
import * as encryptFile from 'shared'
import { Entities } from 'shared'
import { RedisPrefix } from 'shared/src/enums/redis'
import { supabaseClientMock } from 'shared/src/test/helpers/mocks'
import {
  getAllPaginatedStub,
  getSupabaseClientStub,
} from 'shared/src/test/helpers/stubs'
import { emailPreRender } from 'src/emailPreRender'
import { vi } from 'vitest'
import * as connectToQueueFile from '../connectOnQueue'
import * as renderFooterFile from '../renderFooter'
import * as renderHeaderFile from '../renderHeader'
import * as sendToQueueFile from '../sendToQueue'
import { getSubscriberMock } from './factories/subscriberFactory'

const subscriberMock = getSubscriberMock()
const rolesMock = { rolesId: [faker.string.uuid()] }
const ENCRYPTED_VALUE_MOCK = faker.string.hexadecimal({ length: 32 })

const redisGetStub = vi.fn()
const renderHeaderStub = vi.fn()
const connectToQueueStub = vi.fn()
const channelMock = {
  close: vi.fn(),
}
connectToQueueStub.mockReturnValue(channelMock)
const sendToQueueStub = vi.fn()
const renderFooterStub = vi.fn()
vi.mock('amqplib', () => {
  return {
    default: () => ({
      close: vi.fn(),
    }),
  }
})

const configExternalServicesMocks = () => {
  redisGetStub.mockResolvedValue(JSON.stringify(rolesMock))
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  vi.spyOn(redisFile, 'createClient').mockImplementation(() => ({
    get: redisGetStub,
    disconnect: vi.fn(),
  }))

  vi.spyOn(connectToQueueFile, 'connectToQueue').mockImplementation(
    connectToQueueStub
  )

  vi.spyOn(dbFile, 'getSupabaseClient').mockImplementation(
    getSupabaseClientStub
  )

  vi.spyOn(sendToQueueFile, 'sendToQueue').mockImplementation(sendToQueueStub)
}

const configRenderMocks = () => {
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

describe('Email Pre Renderer', () => {
  beforeAll(() => {
    configExternalServicesMocks()
    configRenderMocks()
  })

  it('connects with rabbitMQ queue', async () => {
    await emailPreRender()

    expect(connectToQueueStub).toHaveBeenCalled()
  })

  it('getSubscribers in batches of 100 units', async () => {
    const getAllPaginatedSpy = getAllPaginatedStub([[subscriberMock]])

    await emailPreRender()

    expect(getAllPaginatedSpy).toBeCalledWith({
      supabase: supabaseClientMock,
      entity: Entities.Subcribers,
      batchSize: 100,
    })
  })

  describe('For each subscriber', () => {
    it('get persisted user info from redis', async () => {
      await emailPreRender()

      expect(redisGetStub).toHaveBeenCalledWith(
        `${RedisPrefix.RolesAssigner}${subscriberMock.id}`
      )
    })

    it('calls render footer passing subscriber id and prefix url', async () => {
      await emailPreRender()
      expect(renderFooterStub).toHaveBeenCalledWith(subscriberMock.id, 'url')
    })

    it('calls render header passing rolesID', async () => {
      await emailPreRender()
      expect(renderHeaderStub).toHaveBeenCalledWith(rolesMock.rolesId)
    })

    it('sends to rabbitMQ queue passing { [userEmail]: { roles, footerHTML, headerHTML } }', async () => {
      const renderFooterReturnMock = faker.string.sample()
      const renderHeaderReturnMock = faker.string.sample()
      renderFooterStub.mockImplementation(() => renderFooterReturnMock)
      renderHeaderStub.mockImplementation(() => renderHeaderReturnMock)

      await emailPreRender()

      expect(sendToQueueStub).toHaveBeenCalledWith(channelMock, {
        [subscriberMock.email]: {
          footerHTML: renderFooterReturnMock,
          headerHTML: renderHeaderReturnMock,
          roles: rolesMock.rolesId,
        },
      })
    })
  })
})
