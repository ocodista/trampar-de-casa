import { faker } from '@faker-js/faker'
import { EmailQueues } from 'shared/src/enums/emailQueues'
import * as createRabbitMqChannelFile from 'shared/src/queue/createRabbitMqChannel'
import {
  ackStub,
  assertQueueStub,
  channelMock,
  sendToQueueStub,
} from 'shared/src/test/helpers/rabbitMQ'
import { emailComposer } from 'src/emailComposer'
import { vi } from 'vitest'
import * as consumeMessageFile from '../consumeMessage'
import * as getHtmlRolesFile from '../getHtmlRoles'
import { emailPreRendererItem } from './factories/emailPreRendererQueueItem'

const createRabbitMqChannelStub = vi.fn()
const filterRolesStub = vi.fn()
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
      filterRolesStub
    )
    vi.spyOn(consumeMessageFile, 'consumeMessage').mockImplementation(
      consumeMessageStub
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
      const queueMock = emailPreRendererItem()
      const [email, { footerHTML, headerHTML, roles }] =
        Object.entries(queueMock)[0]

      consumeMessageStub.mockResolvedValue({
        footerHTML,
        headerHTML,
        roles,
        email,
      })

      await emailComposer()

      expect(filterRolesStub).toBeCalled()
    })

    it('Process messages and acknowledge RabbitMQ queue', async () => {
      const [email, { footerHTML, headerHTML, roles }] = Object.entries(
        emailPreRendererItem()
      )[0]
      consumeMessageStub.mockResolvedValue({
        email,
        headerHTML,
        footerHTML,
        roles,
      })

      await emailComposer()

      expect(ackStub).toBeCalled()
    })
    it(`Send mounted HTML to ${EmailQueues.EmailComposer} queue`, async () => {
      const queueMock = emailPreRendererItem()
      const [email, { footerHTML, headerHTML }] = Object.entries(queueMock)[0]
      const filterRolesReturnMock = faker.string.sample()
      filterRolesStub.mockResolvedValue(filterRolesReturnMock)
      consumeMessageStub.mockResolvedValue({
        email,
        footerHTML,
        headerHTML,
        roles: [],
      })

      await emailComposer()

      expect(sendToQueueStub).toBeCalledWith(
        EmailQueues.EmailComposer,
        Buffer.from(
          JSON.stringify({
            [email]: `${headerHTML}${filterRolesReturnMock}${footerHTML}`,
          })
        )
      )
    })
  })
})
