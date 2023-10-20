import { faker } from '@faker-js/faker'
import { SupabaseTable } from 'db/src/supabase/utilityTypes'
import { Entities } from 'shared'
import { BATCH_SIZE, emailPreRender } from 'src/emailPreRender'
import { vi } from 'vitest'
import * as getAllPaginatedFile from '../getAllConfirmedSubscribersPaginated'

type Subscribers = SupabaseTable<'Subscribers'>

import {
  channelMock,
  configExternalServicesMocks,
  configRenderMocks,
  createRabbitMqChannelStub,
  mockSupabaseAndMongo,
  renderFooterStub,
  renderHeaderStub,
  sendToQueueStub,
} from './helpers'

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
    configExternalServicesMocks()
    configRenderMocks()
  })
  afterAll(() => vi.clearAllMocks())

  it('Connects with rabbitMQ queue', async () => {
    await emailPreRender()

    expect(createRabbitMqChannelStub).toHaveBeenCalled()
  })

  it('Get all subscribers', async () => {
    const { getAllPaginatedStub } = mockSubscribersGenerator([])

    await emailPreRender()

    expect(getAllPaginatedStub).toBeCalledWith(
      expect.objectContaining({
        batchSize: BATCH_SIZE,
        entity: Entities.Subcribers,
      })
    )
  })

  describe('For each subscriber', () => {
    it('Get persisted user info from mongo', async () => {
      const { mongoCollectionMock, mongoRoleAssignerMock } =
        mockSupabaseAndMongo()
      mockSubscribersGenerator([
        [
          {
            email: mongoRoleAssignerMock.email,
            id: mongoRoleAssignerMock.id,
          } as unknown as Subscribers,
        ],
      ])

      await emailPreRender()

      expect(mongoCollectionMock.findOne).toHaveBeenCalled()
    })

    it('Calls render footer passing subscriber id and prefix url', async () => {
      const { subscriberMock } = mockSupabaseAndMongo()
      mockSubscribersGenerator([
        [
          {
            email: subscriberMock.email,
            id: subscriberMock.id,
          } as unknown as Subscribers,
        ],
      ])

      await emailPreRender()

      expect(renderFooterStub).toHaveBeenCalledWith(subscriberMock.id, 'url')
    })

    it('Calls render header passing rolesID', async () => {
      const { mongoRoleAssignerMock } = mockSupabaseAndMongo()
      mockSubscribersGenerator([
        [
          {
            email: mongoRoleAssignerMock.email,
            id: mongoRoleAssignerMock.id,
          } as unknown as Subscribers,
        ],
      ])

      await emailPreRender()

      expect(renderHeaderStub).toHaveBeenCalledWith(
        mongoRoleAssignerMock.rolesId
      )
    })

    it('Sends to rabbitMQ queue passing { [userEmail]: { roles, footerHTML, headerHTML } }', async () => {
      const { mongoRoleAssignerMock, subscriberMock } = mockSupabaseAndMongo()
      mockSubscribersGenerator([
        [
          {
            email: subscriberMock.email,
            id: subscriberMock.id,
          } as unknown as Subscribers,
        ],
      ])

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
