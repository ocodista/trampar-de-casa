import { EmailQueues } from 'shared'
import { channelMock, getStub } from 'shared/src/test/helpers/rabbitMQ'
import { emailSender } from 'src/emailSender'
import { vi } from 'vitest'
import * as sendEmailsFile from '../sendEmails'
import { messageFactory } from './factories/messageFactory'
vi.mock('shared/src/queue/createRabbitMqChannel', () => {
  return {
    createRabbitMqChannel: () => channelMock,
  }
})

describe('email sender', () => {
  it('get messages with rabbitMQ', async () => {
    const { messageMock } = messageFactory()
    getStub.mockResolvedValueOnce(messageMock)

    await emailSender()

    expect(getStub).toBeCalledWith(EmailQueues.EmailSender)
  })

  it('if accumulate 25 messages send email', async () => {
    const sendEmailsSpy = vi.spyOn(sendEmailsFile, 'sendEmails')
    const { messageMock } = messageFactory()
    for (const _index of Array.from({ length: 25 })) {
      getStub.mockResolvedValueOnce(messageMock)
    }

    await emailSender()

    expect(sendEmailsSpy).toBeCalled()
  })

  it('if accumulate 100 execute send emails 4 times', async () => {
    const sendEmailsSpy = vi.spyOn(sendEmailsFile, 'sendEmails')
    const { messageMock } = messageFactory()
    for (const _index of Array.from({ length: 100 })) {
      getStub.mockResolvedValueOnce(messageMock)
    }

    await emailSender()

    expect(sendEmailsSpy).toBeCalledTimes(4)
  })
})
