import { ConsumeMessage } from 'amqplib'
import fs from 'node:fs'
import { Resend } from 'resend'
import * as connectToQueueFile from 'shared/src/queue/connectToQueue'
import * as consumeMessageFile from 'src/consumeMessage'
import { emailSender } from 'src/emailSender'
import { vi } from 'vitest'
import { emailComposerItem } from './factories/emailComposerItem'
import {
  ackStub,
  channelMock,
  consumerStub,
  prefetchStub,
} from './helpers/rabbitMQ'

describe('Email Sender Service Tests', () => {
  const { consumeMessage } = consumeMessageFile
  const sendStub = vi.fn()
  const emailsMock = {
    send: sendStub,
  } as unknown as Resend['emails']
  const appendFileSyncStub = vi.fn()
  beforeEach(() => {
    vi.spyOn(connectToQueueFile, 'connectToQueue').mockImplementation(
      async () => channelMock
    )
    vi.spyOn(fs, 'appendFileSync').mockImplementation(appendFileSyncStub)
  })
  it('Prefetch exactly 1000 messages from the queue', async () => {
    await emailSender()

    expect(prefetchStub).toBeCalledWith(1000)
  })
  it('initiate rabbitMQ queue consume', async () => {
    await emailSender()

    expect(consumerStub).toBeCalled()
  })
  it.skip('Email sender breaks messages into batches of 25', () => {
    consumeMessage(
      channelMock,
      emailsMock
    )({
      content: Buffer.from(JSON.stringify(emailComposerItem())),
    } as ConsumeMessage)
  })

  describe('for each batch item', () => {
    it('sends individual email with resend', async () => {
      const emailComposerItemMock = emailComposerItem()
      const [emailMock, htmlMock] = Object.entries(emailComposerItemMock)[0]

      await consumeMessage(
        channelMock,
        emailsMock
      )({
        content: Buffer.from(JSON.stringify(emailComposerItemMock)),
      } as ConsumeMessage)

      expect(sendStub).toBeCalledWith({
        from: 'Trampar de Casa <comece@trampardecasa.com.br>',
        to: emailMock,
        subject: 'Vagas para você Trampar de Casa',
        html: htmlMock,
      })
    })
    it('save email if resend throws a exception', async () => {
      sendStub.mockImplementation(() => {
        throw new Error('Generic error')
      })
      const emailComposerItemMock = emailComposerItem()
      const [emailMock] = Object.entries(emailComposerItemMock)[0]

      await consumeMessage(
        channelMock,
        emailsMock
      )({
        content: Buffer.from(JSON.stringify(emailComposerItemMock)),
      } as ConsumeMessage)

      expect(appendFileSyncStub).toBeCalledWith('path', `${emailMock}\n`)
    })
    it('save email if resend sends email successfully', async () => {
      const emailComposerItemMock = emailComposerItem()
      const [emailMock] = Object.entries(emailComposerItemMock)[0]

      await consumeMessage(
        channelMock,
        emailsMock
      )({
        content: Buffer.from(JSON.stringify(emailComposerItemMock)),
      } as ConsumeMessage)

      expect(appendFileSyncStub).toBeCalledWith('path', `${emailMock}\n`)
    })
    it('Should acknowledge each message after processing', async () => {
      const consumeMessageMock = {
        content: Buffer.from(JSON.stringify(emailComposerItem())),
      } as ConsumeMessage
      await consumeMessage(channelMock, emailsMock)(consumeMessageMock)

      expect(ackStub).toBeCalledWith(consumeMessageMock)
    })
  })
})
