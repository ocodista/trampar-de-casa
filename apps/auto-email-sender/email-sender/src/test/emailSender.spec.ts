import { ConsumeMessage } from 'amqplib'
import * as createRabbitMqChannelFile from 'shared/src/queue/createRabbitMqChannel'
import {
  ackStub,
  channelMock,
  consumerStub,
  nackStub,
  prefetchStub,
} from 'shared/src/test/helpers/rabbitMQ'
import { emailSender } from 'src/emailSender'
import { saveOnEmailChunk } from 'src/saveOnEmailChunk'
import { vi } from 'vitest'
import * as saveEmailOnChunkFile from '../saveOnEmailChunk'
import * as sendEmailFile from '../sendEmail'
import { emailComposerItem } from './factories/emailComposerItem'

const createConsumeMessage = (content: unknown) =>
  ({
    content: Buffer.from(JSON.stringify(content)),
  } as ConsumeMessage)

describe('Email Sender Service Tests', () => {
  const sendEmailStub = vi.fn()
  const createRabbitMqChannelStub = vi.fn()
  createRabbitMqChannelStub.mockResolvedValue(channelMock)

  beforeEach(() => {
    vi.spyOn(
      createRabbitMqChannelFile,
      'createRabbitMqChannel'
    ).mockImplementation(createRabbitMqChannelStub)
    vi.spyOn(sendEmailFile, 'sendEmail').mockImplementation(sendEmailStub)
  })

  it('get messages of rabbitMQ queue', async () => {
    await emailSender()

    expect(consumerStub).toBeCalled()
  })
  it('Prefetch 25 messages of rabbitMQ', async () => {
    await emailSender()

    expect(prefetchStub).toBeCalledWith(25)
  })

  describe('for each batch item', () => {
    it('if not has 25 messages, not send email', async () => {
      const emailComposerItemMock = emailComposerItem()
      const sendEmailSpy = vi.spyOn(saveEmailOnChunkFile, 'sendEmailChunks')

      saveOnEmailChunk(createConsumeMessage(emailComposerItemMock), channelMock)

      expect(sendEmailSpy).not.toBeCalled()
    })

    it('if has 25 messages, send email', async () => {
      const sendEmailSpy = vi.spyOn(saveEmailOnChunkFile, 'sendEmailChunks')

      for (let index = 0; index < 25; index++) {
        const emailComposerItemMock = emailComposerItem()

        await saveOnEmailChunk(
          createConsumeMessage(emailComposerItemMock),
          channelMock
        )
      }

      expect(sendEmailSpy).not.toBeCalled()
    })
    it('acknowledge each message after sending', async () => {
      for (let index = 0; index < 25; index++) {
        const emailComposerItemMock = emailComposerItem()

        await saveOnEmailChunk(
          createConsumeMessage(emailComposerItemMock),
          channelMock
        )
      }

      expect(ackStub).toBeCalled()
    })
    it('not acknowledge message after throwing an error when sending', async () => {
      const sendEmailSpy = vi.spyOn(sendEmailFile, 'sendEmail')
      sendEmailSpy.mockImplementation(() => {
        throw new Error('Generic error')
      })

      for (let index = 0; index < 25; index++) {
        const emailComposerItemMock = emailComposerItem()

        await saveOnEmailChunk(
          createConsumeMessage(emailComposerItemMock),
          channelMock
        )
      }

      expect(nackStub).toBeCalled()
    })
  })
})
