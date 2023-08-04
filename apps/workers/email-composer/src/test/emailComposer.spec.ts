import { faker } from '@faker-js/faker'
import { EmailQueues } from 'shared/src/enums/emailQueues'
import * as createRabbitMqConnectionFile from 'shared/src/queue/createRabbitMqConnection'
import {
  assertQueueStub,
  channelMock,
  consumerStub,
} from 'shared/src/test/helpers/rabbitMQ'
import {
  EmailPreRenderMessage,
  composeEmail,
  consumePreRenderQueue,
  parsePreRenderMessage,
} from 'src/emailComposer'
import { vi } from 'vitest'
import * as getHtmlRolesFile from '../getHtmlRoles'
import { ConsumeMessage } from 'amqplib'

const createChannelStub = vi.fn().mockResolvedValue(channelMock)
const createRabbitMqConnectionStub = vi.fn().mockResolvedValue({
  createChannel: createChannelStub,
})
const getHtmlRolesStub = vi.fn()
const rabbitMqConfig = () => {
  vi.spyOn(
    createRabbitMqConnectionFile,
    'createRabbitMqConnection'
  ).mockImplementation(createRabbitMqConnectionStub)

  // createRabbitMqConnectionStub.mockResolvedValue(channelMock)
}

describe('Email Composer Service Tests', () => {
  beforeEach(() => {
    rabbitMqConfig()
    vi.spyOn(getHtmlRolesFile, 'getHtmlRoles').mockImplementation(
      getHtmlRolesStub
    )
  })

  it('establishes connection with rabbitMQ', async () => {
    await composeEmail()
    expect(createRabbitMqConnectionStub).toBeCalled()
  })

  // TODO: this test is only testing if you create the queue
  it(`gets subscriber information from the ${EmailQueues.EmailPreRenderer} queue`, async () => {
    await composeEmail()
    expect(assertQueueStub).toBeCalledWith(EmailQueues.EmailPreRenderer)
  })

  describe('For each queue message', () => {
    const emailMock = faker.internet.email()
    const rolesMock = [faker.string.uuid(), faker.string.uuid()]
    const prerenderMessageMock: EmailPreRenderMessage = {
      [emailMock]: {
        footerHTML: 'FOOTERHTML',
        headerHTML: 'headerHTML',
        roles: rolesMock,
      },
    }
    const mockedBufferMessage = Buffer.from(
      JSON.stringify(prerenderMessageMock)
    )

    it('gets roles HTML', async () => {
      await parsePreRenderMessage(mockedBufferMessage)
      expect(getHtmlRolesStub).toBeCalledWith(rolesMock)
    })

    it('calls parser when message is consumed', async () => {
      await consumePreRenderQueue(
        { content: mockedBufferMessage } as ConsumeMessage,
        channelMock
      )
      // TODO: Finish test by mocking parser function
    })

    it('converts rabbit message buffer into [email]: bodyHTML object', async () => {
      const result = await parsePreRenderMessage(
        Buffer.from(JSON.stringify(prerenderMessageMock))
      )
      const rolesHTML = await getHtmlRolesFile.getHtmlRoles(rolesMock)
      expect(result).toStrictEqual({
        [emailMock]: `${prerenderMessageMock[emailMock].headerHTML}${rolesHTML}${prerenderMessageMock[emailMock].footerHTML}`,
      })
    })

    it.todo('processes messages and acknowledge RabbitMQ queue')
    it.todo(`Send mounted HTML to ${EmailQueues.EmailSender} queue`)
  })
})
