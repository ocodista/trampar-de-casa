import { faker } from '@faker-js/faker'
import { ConsumeMessage } from 'amqplib'
import { EmailQueues } from 'shared/src/enums/emailQueues'
import * as createRabbitMqChannelFile from 'shared/src/queue/createRabbitMqChannel'
import {
  assertQueueStub,
  channelMock,
  consumerStub,
} from 'shared/src/test/helpers/rabbitMQ'
import { consumeEmailPreRendererMessages } from 'src/consumeEmailPreRendererMessages'
import { emailComposer } from 'src/emailComposer'
import { vi } from 'vitest'
import * as getHtmlRolesFile from '../getHtmlRoles'
import { emailPreRendererItem } from './factories/emailPreRendererQueueItem'

const createRabbitMqChannelStub = vi.fn()
const getHtmlRolesStub = vi.fn()
const rabbitMqConfig = () => {
  vi.spyOn(
    createRabbitMqChannelFile,
    'createRabbitMqChannel'
  ).mockImplementation(createRabbitMqChannelStub)
  createRabbitMqChannelStub.mockResolvedValue(channelMock)
}

describe('Email Composer Service Tests', () => {
  const consumeMessageStub = vi.fn()
  beforeEach(() => {
    rabbitMqConfig()
    vi.spyOn(getHtmlRolesFile, 'getHtmlRoles').mockImplementation(
      getHtmlRolesStub
    )
  })

  it('Establish connection with rabbitMQ', async () => {
    await emailComposer()

    expect(createRabbitMqChannelStub).toBeCalled()
  })
  it(`Gets subscriber information from the ${EmailQueues.EmailPreRenderer} queue`, async () => {
    await emailComposer()

    expect(assertQueueStub).toBeCalledWith(EmailQueues.EmailPreRenderer)
  })

  describe('Each queue message', () => {
    it('Get concatenated roles html', async () => {
      const rolesIdMock = [faker.string.sample()]
      const emailPreRendererMock = {
        [faker.internet.email()]: {
          roles: rolesIdMock,
          footerHTML: faker.string.sample(),
          headerHTML: faker.string.sample(),
        },
      }
      const sendEmailCallback = vi.fn()

      await consumeEmailPreRendererMessages(sendEmailCallback)({
        content: Buffer.from(JSON.stringify(emailPreRendererMock)),
      } as ConsumeMessage)

      expect(getHtmlRolesStub).toBeCalledWith(rolesIdMock)
    })

    it('Process messages and acknowledge RabbitMQ queue', async () => {
      await emailComposer()

      expect(consumerStub).toBeCalledWith(
        expect.anything(),
        expect.anything(),
        { noAck: true }
      )
    })
    it(`Send mounted HTML to ${EmailQueues.EmailComposer} queue`, async () => {
      const queueMock = emailPreRendererItem()
      const [email, { footerHTML, headerHTML }] = Object.entries(queueMock)[0]
      const filterRolesReturnMock = faker.string.sample()
      getHtmlRolesStub.mockResolvedValue(filterRolesReturnMock)
      consumeMessageStub.mockResolvedValue({
        email,
        footerHTML,
        headerHTML,
        roles: [],
      })
      const sendEmailCallback = vi.fn()
      const rolesIdMock = [faker.string.sample()]
      const emailPreRendererMock = {
        [faker.internet.email()]: {
          roles: rolesIdMock,
          footerHTML: faker.string.sample(),
          headerHTML: faker.string.sample(),
        },
      }

      await consumeEmailPreRendererMessages(sendEmailCallback)({
        content: Buffer.from(JSON.stringify(emailPreRendererMock)),
      } as ConsumeMessage)

      expect(sendEmailCallback).toBeCalled()
    })
  })
})
