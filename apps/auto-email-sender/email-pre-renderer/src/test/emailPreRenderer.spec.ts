import { faker } from '@faker-js/faker'
import { emailPreRender } from 'src/emailPreRender'
import { vi } from 'vitest'
import {
  channelMock,
  configExternalServicesMocks,
  configRenderMocks,
  createRabbitMqChannelStub,
  getAllSubscribersStub,
  mockSupabaseAndRedis,
  renderFooterStub,
  renderHeaderStub,
  sendToQueueStub,
} from './helpers'

describe('Email Pre Renderer', () => {
  const renderFooterReturnMock = faker.string.sample()
  const renderHeaderReturnMock = faker.string.sample()
  renderFooterStub.mockImplementation(() => renderFooterReturnMock)
  renderHeaderStub.mockImplementation(() => renderHeaderReturnMock)
  beforeAll(() => {
    configExternalServicesMocks()
    configRenderMocks()
  })
  afterAll(() => vi.clearAllMocks())

  it('Connects with rabbitMQ queue', async () => {
    await emailPreRender()

    expect(createRabbitMqChannelStub).toHaveBeenCalled()
  })

  it('Get all subscribers', async () => {
    await emailPreRender()

    expect(getAllSubscribersStub).toBeCalledWith()
  })

  describe('For each subscriber', () => {
    it('Get persisted user info from mongo', async () => {
      const { mongoCollectionMock } = mockSupabaseAndRedis()

      await emailPreRender()

      expect(mongoCollectionMock.findOne).toHaveBeenCalled()
    })

    it('Calls render footer passing subscriber id and prefix url', async () => {
      const { subscriberMock } = mockSupabaseAndRedis()

      await emailPreRender()

      expect(renderFooterStub).toHaveBeenCalledWith(subscriberMock.id, 'url')
    })

    it('Calls render header passing rolesID', async () => {
      const { mongoRoleAssignerMock } = mockSupabaseAndRedis()

      await emailPreRender()

      expect(renderHeaderStub).toHaveBeenCalledWith(
        mongoRoleAssignerMock.rolesId
      )
    })

    it('Sends to rabbitMQ queue passing { [userEmail]: { roles, footerHTML, headerHTML } }', async () => {
      const { mongoRoleAssignerMock, subscriberMock } = mockSupabaseAndRedis()

      await emailPreRender()

      expect(sendToQueueStub).toHaveBeenCalledWith(channelMock, {
        [subscriberMock.email]: {
          footerHTML: renderFooterReturnMock,
          headerHTML: renderHeaderReturnMock,
          roles: mongoRoleAssignerMock.rolesId,
        },
      })
    })
  })
})
