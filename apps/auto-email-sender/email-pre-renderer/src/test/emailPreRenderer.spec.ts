import { faker } from '@faker-js/faker'
import { SupabaseTable } from 'db/src/supabase/utilityTypes'
import * as sendToQueueFile from 'shared/src/queue/sendToQueue'
import { channelMock, getStub } from 'shared/src/test/helpers/rabbitMQ'
import { vi } from 'vitest'
import { emailPreRender } from '../emailPreRender'
import * as renderFooterFile from '../renderFooter'
import * as renderHeaderFile from '../renderHeader'

const mockRenderHeaderAndFooter = () => {
  const renderedFooterMock = faker.string.sample(1000)
  const renderedHeaderMock = faker.string.sample(1000)
  const renderFooterHtmlStub = vi.fn()
  const renderHeaderHtmlStub = vi.fn()
  renderFooterHtmlStub.mockReturnValue(renderedFooterMock)
  renderHeaderHtmlStub.mockReturnValue(renderedHeaderMock)
  vi.spyOn(renderFooterFile, 'renderFooterHTML').mockImplementation(
    renderFooterHtmlStub
  )
  vi.spyOn(renderHeaderFile, 'renderHeaderHtml').mockImplementation(
    renderHeaderHtmlStub
  )

  return { renderedFooterMock, renderedHeaderMock }
}
const mockMountHeaderAndFooter = () => {
  const renderedFooterMock = faker.string.sample(1000)
  const renderedHeaderMock = faker.string.sample(1000)
  const mountFooterHtmlStub = vi.fn()
  const mountHeaderHtmlStub = vi.fn()
  mountFooterHtmlStub.mockResolvedValue(renderedFooterMock)
  mountHeaderHtmlStub.mockResolvedValue(renderedHeaderMock)
  vi.spyOn(renderFooterFile, 'mountFooter').mockImplementation(
    mountFooterHtmlStub
  )
  vi.spyOn(renderHeaderFile, 'mountHeader').mockImplementation(
    mountHeaderHtmlStub
  )

  return { renderedFooterMock, renderedHeaderMock }
}

type Subscribers = SupabaseTable<'Subscribers'>

import { EmailQueues } from 'shared'
import {
  configRenderMocks,
  mockExternalServices,
  mountHeaderStub,
  renderFooterStub,
} from './helpers'

const mockMessageContent = <T>(props: T) => {
  const mesageBufferMock = Buffer.from(JSON.stringify(props))

  getStub.mockResolvedValueOnce({ content: mesageBufferMock })
}

// mock process.exit
vi.spyOn(process, 'exit').mockImplementation(vi.fn())

describe('Email Pre Renderer', () => {
  beforeAll(() => {
    configRenderMocks()
  })
  afterAll(() => vi.clearAllMocks())

  it('Connects with rabbitMQ queue', async () => {
    const { createRabbitMqConnectionStub } = mockExternalServices()

    await emailPreRender()

    expect(createRabbitMqConnectionStub).toHaveBeenCalled()
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
      const { renderedFooterMock } = mockRenderHeaderAndFooter()
      mockMessageContent({
        email: subscriberMock.email,
        id: subscriberMock.id,
      } as unknown as Subscribers)

      await emailPreRender()

      expect(renderFooterStub).toHaveBeenCalledWith(
        subscriberMock.id,
        'url',
        renderedFooterMock
      )
    })

    it('Calls render header passing rolesID', async () => {
      const { mongoRoleAssignerMock } = mockExternalServices()
      const { renderedHeaderMock } = mockRenderHeaderAndFooter()
      mockMessageContent({
        email: mongoRoleAssignerMock.email,
        id: mongoRoleAssignerMock.id,
      } as unknown as Subscribers)

      await emailPreRender()

      expect(mountHeaderStub).toHaveBeenCalledWith(
        mongoRoleAssignerMock.rolesId,
        renderedHeaderMock
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
      const { renderedFooterMock, renderedHeaderMock } =
        mockMountHeaderAndFooter()

      const sendToQueueSpy = vi.spyOn(sendToQueueFile, 'sendToQueue')

      await emailPreRender()
      expect(sendToQueueSpy).toHaveBeenCalledWith(
        EmailQueues.EmailPreRenderer,
        channelMock,
        {
          [subscriberMock.email]: {
            footerHTML: renderedFooterMock,
            headerHTML: renderedHeaderMock,
            roles: mongoRoleAssignerMock.rolesId,
          },
        }
      )
    })
  })
})
