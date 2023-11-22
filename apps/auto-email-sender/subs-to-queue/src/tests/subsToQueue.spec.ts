import * as dbFile from 'db'
import * as getAllConfirmedSubscribersPaginatedFile from 'db/src/supabase/domains/subscribers/getAllConfirmedSubscribersPaginated'
import * as sharedFile from 'shared'
import { mockAsyncGenerator } from 'shared/src/test/helpers/mockAsyncGeneratorFunction'
import { supabaseClientMock } from 'shared/src/test/helpers/mocks'
import {
  channelMock,
  onceStub,
  sendToQueueStub,
} from 'shared/src/test/helpers/rabbitMQ'
import { subsToQueue } from 'src/subsToQueue'
import { vi } from 'vitest'
import { subscribersMock } from './mocks'

const supabasePaginationSetup = () => {
  const getAllConfirmedSubscribersPaginatedSpy = vi.spyOn(
    getAllConfirmedSubscribersPaginatedFile,
    'getAllConfirmedSubscribersPaginated'
  )
  vi.spyOn(dbFile, 'getSupabaseClient').mockImplementation(
    () => supabaseClientMock
  )

  return { getAllConfirmedSubscribersPaginatedSpy }
}

const rabbitMqSetup = () => {
  const createRabbitMqChannelSpy = vi.spyOn(sharedFile, 'createRabbitMqChannel')
  createRabbitMqChannelSpy.mockImplementation(async () => channelMock)

  return { createRabbitMqChannelSpy }
}

describe('subs-to-queue', () => {
  describe('getting supabase subscribers', () => {
    it('get subscribers in chunks with 1000 items', async () => {
      const { getAllConfirmedSubscribersPaginatedSpy } =
        supabasePaginationSetup()
      rabbitMqSetup()
      onceStub.mockImplementation((event: string, cb: () => unknown) => {
        cb()
      })

      await subsToQueue()

      expect(getAllConfirmedSubscribersPaginatedSpy).toBeCalledWith(
        expect.objectContaining({ batchSize: 1000 })
      )
    })
    it('get only necessary columns {id, email, skillsId, startedWorkingAt, isConfirmed}', async () => {
      const { getAllConfirmedSubscribersPaginatedSpy } =
        supabasePaginationSetup()
      rabbitMqSetup()

      await subsToQueue()

      expect(getAllConfirmedSubscribersPaginatedSpy).toBeCalledWith(
        expect.objectContaining({
          selectQuery: 'id, email, skillsId, startedWorkingAt, isConfirmed',
        })
      )
    })
  })

  describe('For Each chunk', () => {
    it('Read Subscribers Chunk', async () => {
      const { getAllConfirmedSubscribersPaginatedSpy } =
        supabasePaginationSetup()
      rabbitMqSetup()
      const subscriberMock = subscribersMock(1)
      getAllConfirmedSubscribersPaginatedSpy
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        .mockImplementation(() => mockAsyncGenerator([subscriberMock]))

      await subsToQueue()

      expect(sendToQueueStub).toBeCalledTimes(2)
    })
  })
})
