import { EmailQueues } from 'shared'
import { channelMock } from 'shared/src/test/helpers/rabbitMQ'
import { writeToQueues } from 'src/writeToQueues'
import { vi } from 'vitest'
import * as sendToQueueFile from '../sendToQueue'
import { subscribersMock } from './mocks'

describe('Read Subscribers Chunks', () => {
  describe('For Each Subscriber', () => {
    it(`Send to ${EmailQueues.EmailPreRenderSubs} the object with {id, email}`, async () => {
      const subscribers = subscribersMock(1)
      const { id, email } = subscribers[0]
      const sendToQueueSpy = vi.spyOn(sendToQueueFile, 'sendToQueue')
      await writeToQueues(subscribers, channelMock)
      expect(sendToQueueSpy).toHaveBeenCalledWith(
        EmailQueues.EmailPreRenderSubs,
        channelMock,
        { id, email }
      )
    })
    it(`Send to ${EmailQueues.RolesAssignerSubs} the object with {skillsId,startedWorkingAt,id,email,isConfirmed}`, async () => {
      const subscribers = subscribersMock(1)
      const { id, email, isConfirmed, skillsId, startedWorkingAt } =
        subscribers[0]

      const sendToQueueSpy = vi.spyOn(sendToQueueFile, 'sendToQueue')

      await writeToQueues(subscribers, channelMock)

      expect(sendToQueueSpy).toHaveBeenCalledWith(
        EmailQueues.RolesAssignerSubs,
        channelMock,
        {
          id,
          email,
          isConfirmed,
          skillsId,
          startedWorkingAt,
        }
      )
    })
  })
})
