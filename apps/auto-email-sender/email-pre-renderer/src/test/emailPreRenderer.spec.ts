import { faker } from '@faker-js/faker'
import * as getAllPaginatedFile from 'db/src/supabase/domains/subscribers/getAllConfirmedSubscribersPaginated'
import { SupabaseTable } from 'db/src/supabase/utilityTypes'
import * as sendToQueueFile from 'shared/src/queue/sendToQueue'
import { channelMock, getStub } from 'shared/src/test/helpers/rabbitMQ'
import { emailPreRender } from 'src/emailPreRender'
import { vi } from 'vitest'

type Subscribers = SupabaseTable<'Subscribers'>

import { EmailQueues } from 'shared'
import {
  configRenderMocks,
  mockExternalServices,
  renderFooterStub,
  renderHeaderStub,
} from './helpers'

const mockMessageContent = <T>(props: T) => {
  const mesageBufferMock = Buffer.from(JSON.stringify(props))

  getStub.mockResolvedValueOnce({ content: mesageBufferMock })
}

// mock process.exit
vi.spyOn(process, 'exit').mockImplementation(vi.fn())

const mockSubscribersGenerator = (responseChunks: Array<Subscribers[]>) => {
  const getAllPaginatedStub = vi.spyOn(
    getAllPaginatedFile,
    'getAllConfirmedSubscribersPaginated'
  )
  getAllPaginatedStub.mockImplementation(async function* () {
    for (const chunk of responseChunks) {
      yield chunk
    }
  })

  return { getAllPaginatedStub }
}

describe('Email Pre Renderer', () => {
  const renderFooterReturnMock = faker.string.sample()
  const renderHeaderReturnMock = faker.string.sample()
  renderFooterStub.mockImplementation(() => renderFooterReturnMock)
  renderHeaderStub.mockImplementation(() => renderHeaderReturnMock)
  beforeAll(() => {
    configRenderMocks()
  })
  afterAll(() => vi.clearAllMocks())

  it('Connects with rabbitMQ queue', async () => {
    const { createRabbitMqChannelStub } = mockExternalServices()

    await emailPreRender()

    expect(createRabbitMqChannelStub).toHaveBeenCalled()
  })

  it('get messages on rabbitmq queue', async () => {
    mockExternalServices()

    await emailPreRender()

    expect(getStub).toBeCalled()
  })

  describe('For each subscriber', () => {
    it('Get persisted user info from mongo', async () => {
      const { mongoCollectionMock, mongoRoleAssignerMock } =
        mockExternalServices()
      mockMessageContent({
        email: mongoRoleAssignerMock.email,
        id: mongoRoleAssignerMock.id,
      } as unknown as Subscribers)
      await emailPreRender()

      expect(mongoCollectionMock.findOne).toHaveBeenCalled()
    })

    it('Calls render footer passing subscriber id and prefix url', async () => {
      const { subscriberMock } = mockExternalServices()
      mockMessageContent({
        email: subscriberMock.email,
        id: subscriberMock.id,
      } as unknown as Subscribers)

      await emailPreRender()

      expect(renderFooterStub).toHaveBeenCalledWith(subscriberMock.id, 'url')
    })

    it('Calls render header passing rolesID', async () => {
      const { mongoRoleAssignerMock } = mockExternalServices()
      mockMessageContent({
        email: mongoRoleAssignerMock.email,
        id: mongoRoleAssignerMock.id,
      } as unknown as Subscribers)

      await emailPreRender()

      expect(renderHeaderStub).toHaveBeenCalledWith(
        mongoRoleAssignerMock.rolesId,
        mongoRoleAssignerMock.id
      )
    })

    it('Sends to rabbitMQ queue passing { [userEmail]: { roles, footerHTML, headerHTML } }', async () => {
      const { mongoRoleAssignerMock, subscriberMock, findOneStub } =
        mockExternalServices()
      findOneStub.mockResolvedValue({ rolesId: [] })
      mockMessageContent({
        email: subscriberMock.email,
        id: subscriberMock.id,
      } as unknown as Subscribers)

      const sendToQueueSpy = vi.spyOn(sendToQueueFile, 'sendToQueue')

      await emailPreRender()

      expect(sendToQueueSpy).toHaveBeenCalledWith(
        EmailQueues.EmailPreRenderer,
        channelMock,
        {
          [subscriberMock.email]: {
            footerHTML: renderFooterReturnMock,
            headerHTML: renderHeaderReturnMock,
            roles: mongoRoleAssignerMock.rolesId,
          },
        }
      )
    })
  })
})
