import { faker } from '@faker-js/faker'
import { GetMessage } from 'amqplib'
import { EmailQueues } from 'shared'
import * as createRabbitMqConnectionFile from 'shared/src/queue/createRabbitMqConnection'
import { channelMock, sendToQueueStub } from 'shared/src/test/helpers/rabbitMQ'
import {
  EmailPreRenderMessage,
  composeEmail,
  consumePreRenderQueue,
} from 'src/emailComposer'
import { parsePreRenderMessage, rolesSubject } from 'src/parsePreRenderMessage'
import { vi } from 'vitest'
import * as createEmailHtmlFile from '../createEmailHtml'
import * as getHtmlRolesFile from '../getHtmlRoles'

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
}

describe.only('Email Composer Service Tests', () => {
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

    it('converts rabbit message buffer into [email]: bodyHTML object', async () => {
      const createEmailHtmlStub = vi.fn()
      vi.spyOn(createEmailHtmlFile, 'createEmailHtml').mockImplementation(
        createEmailHtmlStub
      )
      const createEmailHtmlReturn = faker.string.sample()
      createEmailHtmlStub.mockResolvedValue(createEmailHtmlReturn)
      const rolesHTML = faker.string.sample()
      getHtmlRolesStub.mockReturnValue(rolesHTML)
      const inlineHTML = `${prerenderMessageMock[emailMock].headerHTML}${rolesHTML}${prerenderMessageMock[emailMock].footerHTML}`

      await consumePreRenderQueue(
        {
          content: Buffer.from(JSON.stringify(prerenderMessageMock)),
        } as unknown as GetMessage,
        channelMock
      )

      expect(createEmailHtmlStub).toBeCalledWith(inlineHTML)
      expect(sendToQueueStub).toBeCalledWith(
        EmailQueues.EmailSender,
        Buffer.from(
          JSON.stringify({
            [emailMock]: {
              html: createEmailHtmlReturn,
              subject: rolesSubject(rolesMock.length),
            },
          })
        )
      )
    })
  })
})
