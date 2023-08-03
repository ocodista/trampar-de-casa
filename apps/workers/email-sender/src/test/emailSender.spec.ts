import { ConsumeMessage } from 'amqplib'
import fs from 'node:fs'
import * as connectToQueueFile from 'shared/src/queue/connectToQueue'
import { emailSender } from 'src/emailSender'
import * as sendEmailFile from 'src/sendEmail'
import { SpyInstance, vi } from 'vitest'
import { emailComposerItem } from './factories/emailComposerItem'
import { ackStub, channelMock, getStub } from './helpers/rabbitMQ'

describe('Email Sender Service Tests', () => {
  const sendStub = vi.fn()
  const appendFileSyncStub = vi.fn()
  const sendEmailStub = vi.fn()
  const connectToQueueStub = vi.fn()
  let sendEmailSpy: SpyInstance
  connectToQueueStub.mockResolvedValue(channelMock)
  beforeEach(() => {
    vi.spyOn(connectToQueueFile, 'connectToQueue').mockImplementation(
      connectToQueueStub
    )
    vi.spyOn(fs, 'appendFileSync').mockImplementation(appendFileSyncStub)
    sendEmailSpy = vi.spyOn(sendEmailFile, 'sendEmail')
    sendEmailSpy.mockImplementation(sendEmailStub)
  })
  it('initiate rabbitMQ queue consume', async () => {
    await emailSender()

    expect(connectToQueueStub).toBeCalled()
  })
  it.skip('Email sender breaks messages into batches of 25')

  describe('for each batch item', () => {
    it.only('sends individual email with resend', async () => {
      const emailComposerItemMock = emailComposerItem()
      const [emailMock, htmlMock] = Object.entries(emailComposerItemMock)[0]
      getStub.mockResolvedValueOnce({
        content: Buffer.from(JSON.stringify({ [emailMock]: htmlMock })),
      })
      getStub.mockResolvedValueOnce(false)

      await emailSender()

      expect(sendEmailSpy).toBeCalledWith({
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
      getStub.mockResolvedValueOnce({
        content: Buffer.from(JSON.stringify(emailComposerItemMock)),
      })
      getStub.mockResolvedValueOnce(false)

      await emailSender()

      expect(appendFileSyncStub).toBeCalled()
    })
    it('save email if resend sends email successfully', async () => {
      const emailComposerItemMock = emailComposerItem()
      getStub.mockResolvedValueOnce({
        content: Buffer.from(JSON.stringify(emailComposerItemMock)),
      })
      getStub.mockResolvedValueOnce(false)

      await emailSender()

      expect(appendFileSyncStub).toBeCalled()
    })
    it('Should acknowledge each message after processing', async () => {
      const consumeMessageMock = {
        content: Buffer.from(JSON.stringify(emailComposerItem())),
      } as ConsumeMessage
      getStub.mockResolvedValueOnce(consumeMessageMock)
      getStub.mockResolvedValueOnce(false)

      expect(ackStub).toBeCalledWith(consumeMessageMock)
    })
  })
})
