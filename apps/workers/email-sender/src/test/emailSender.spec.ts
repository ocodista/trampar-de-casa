import { ConsumeMessage } from 'amqplib'
import { emailsObjectMock } from 'setEnvVars'
import * as connectToQueueFile from 'shared/src/queue/connectToQueue'
import { emailSender } from 'src/emailSender'
import { vi } from 'vitest'
import * as chunkArrayFile from '../chunkArray'
import * as sendEmailFile from '../sendEmail'
import { emailComposerItem } from './factories/emailComposerItem'
import { ackStub, channelMock, getStub } from './helpers/rabbitMQ'

describe('Email Sender Service Tests', () => {
  const sendEmailStub = vi.fn()
  const connectToQueueStub = vi.fn()
  connectToQueueStub.mockResolvedValue(channelMock)

  beforeEach(() => {
    vi.spyOn(connectToQueueFile, 'connectToQueue').mockImplementation(
      connectToQueueStub
    )
    vi.spyOn(sendEmailFile, 'sendEmail').mockImplementation(sendEmailStub)
  })

  it('get messages of rabbitMQ queue', async () => {
    await emailSender()

    expect(getStub).toBeCalled()
  })
  it('Email sender breaks messages into batches of 25', async () => {
    const chunkArraySpy = vi.spyOn(chunkArrayFile, 'chunkArray')

    await emailSender()

    expect(chunkArraySpy).toBeCalledWith([], 25)
  })

  describe('for each batch item', () => {
    it('sends individual email with resend', async () => {
      const emailComposerItemMock = emailComposerItem()
      const [emailMock, htmlMock] = Object.entries(emailComposerItemMock)[0]
      getStub.mockResolvedValueOnce({
        content: Buffer.from(JSON.stringify({ [emailMock]: htmlMock })),
      })
      getStub.mockResolvedValueOnce(false)

      await emailSender()

      expect(sendEmailStub).toBeCalledWith(
        emailsObjectMock,
        emailMock,
        htmlMock
      )
    })
    it('Should acknowledge each message after processing', async () => {
      const consumeMessageMock = {
        content: Buffer.from(JSON.stringify(emailComposerItem())),
      } as ConsumeMessage
      getStub.mockResolvedValueOnce(consumeMessageMock)
      getStub.mockResolvedValueOnce(false)

      await emailSender()

      expect(ackStub).toBeCalledWith(consumeMessageMock)
    })
  })
})
