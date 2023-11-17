import { EmailQueues } from 'shared'
import { channelMock } from 'shared/src/test/helpers/rabbitMQ'
import { readChunk } from 'src/readChunk'
import { vi } from 'vitest'
import * as sendSubInfoToEmailComposerFile from '../sendToSubsInfoEmailComposer'
import * as sendSubInfoToEmailPreRendererFile from '../sendToSubsInfoEmailPreRenderer'
import { subscribersMock } from './mocks'

describe('Read Subscribers Chunks', () => {
  describe('For Each Subscriber', () => {
    it(`Send to ${EmailQueues.SubsInfoEmailPreRenderer} the object with {id, email}`, async () => {
      const subscribers = subscribersMock(1)
      const { id, email } = subscribers[0]
      const sendToSubsInfoEmailPreRendererSpy = vi.spyOn(
        sendSubInfoToEmailPreRendererFile,
        'sendToSubsInfoEmailPreRenderer'
      )

      await readChunk(subscribers, channelMock)

      expect(sendToSubsInfoEmailPreRendererSpy).toHaveBeenCalledWith(
        channelMock,
        { id, email }
      )
    })
    it(`Send to ${EmailQueues.SubsInfoEmailComposer} the object with {skillsId,startedWorkingAt,id,email,isConfirmed}`, async () => {
      const subscribers = subscribersMock(1)
      const { id, email, isConfirmed, skillsId, startedWorkingAt } =
        subscribers[0]
      const sendSubInfoToEmailComposerSpy = vi.spyOn(
        sendSubInfoToEmailComposerFile,
        'sendToSubsInfoEmailComposer'
      )

      await readChunk(subscribers, channelMock)

      expect(sendSubInfoToEmailComposerSpy).toHaveBeenCalledWith(channelMock, {
        id,
        email,
        isConfirmed,
        skillsId,
        startedWorkingAt,
      })
    })
  })
})
