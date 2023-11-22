import { Channel } from 'amqplib'
import { EmailQueues } from 'shared/src/enums/emailQueues'
import * as createRabbitMqChannel from 'shared/src/queue/createRabbitMqChannel'
import { channelMock } from 'shared/src/test/helpers/rabbitMQ'
import { emailSender } from 'src/emailSender'
import { vi } from 'vitest'
import * as sendEmailsFile from '../sendEmails'
import { messageFactory } from './factories/messageFactory'

// mock process.exit
vi.spyOn(process, 'exit').mockImplementation(vi.fn())

const rabbitMqMockSetup = () => {
  const getStub = vi.fn()
  vi.spyOn(createRabbitMqChannel, 'createRabbitMqChannel').mockResolvedValue({
    ...channelMock,
    get: getStub,
  } as unknown as Channel)

  return { getStub }
}

describe('email sender', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('get messages with rabbitMQ', async () => {
    const { getStub } = rabbitMqMockSetup()
    const { messageMock } = messageFactory()
    getStub.mockResolvedValueOnce(messageMock)

    await emailSender()

    expect(getStub).toBeCalledWith(EmailQueues.EmailSender)
  })

  it('if accumulate 25 messages send email', async () => {
    const { getStub } = rabbitMqMockSetup()
    const sendEmailsSpy = vi.spyOn(sendEmailsFile, 'sendEmails')
    const { messageMock } = messageFactory()
    for (const _index of Array.from({ length: 25 })) {
      getStub.mockResolvedValueOnce(messageMock)
    }

    await emailSender()

    expect(sendEmailsSpy).toBeCalled()
  })

  it('if accumulate 101 execute send emails 5 times', async () => {
    const { getStub } = rabbitMqMockSetup()
    const sendEmailsSpy = vi.spyOn(sendEmailsFile, 'sendEmails')
    const { messageMock } = messageFactory()

    for (const _index of Array.from({ length: 101 })) {
      getStub.mockResolvedValueOnce(messageMock)
    }

    await emailSender()

    expect(sendEmailsSpy).toBeCalledTimes(5)
  })
})
