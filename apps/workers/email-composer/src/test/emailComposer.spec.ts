import { faker } from '@faker-js/faker'
import { EmailQueues } from 'shared/src/enums/emailQueues'
import * as connectToQueueFile from 'shared/src/queue/connectToQueue'
import { emailComposer } from 'src/emailComposer'
import { vi } from 'vitest'
import * as filterRolesFile from '../filterRoles'
import { emailPreRendererItem } from './factories/emailPreRendererQueueItem'
import {
  ackStub,
  assertQueueStub,
  channelMock,
  consumerStub,
  sendToQueueStub,
} from './helpers/rabbitMQ'

const connectToQueueStub = vi.fn()
const filterRolesStub = vi.fn()
describe('Email Composer Service Tests', () => {
  const sendToConsumer = (obj: unknown) => {
    consumerStub.mockImplementationOnce((_, onMessage) => {
      onMessage({
        content: Buffer.from(JSON.stringify(obj)),
      })
    })
  }
  beforeEach(() => {
    vi.spyOn(connectToQueueFile, 'connectToQueue').mockImplementation(
      connectToQueueStub
    )
    vi.spyOn(filterRolesFile, 'filterRoles').mockImplementation(filterRolesStub)
    connectToQueueStub.mockResolvedValue(channelMock)
  })

  it('establish connection with rabbitMQ', async () => {
    await emailComposer()

    expect(connectToQueueStub).toBeCalled()
  })
  it(`Gets subscriber information from the ${EmailQueues.EmailPreRenderer} queue`, async () => {
    await emailComposer()

    expect(assertQueueStub).toBeCalledWith(EmailQueues.EmailPreRenderer)
  })

  describe('each queue message', () => {
    it('Verifies roles validity based on Supabase search', async () => {
      const queueMock = emailPreRendererItem()
      sendToConsumer(queueMock)

      await emailComposer()

      expect(filterRolesStub).toBeCalled()
    })

    it('process messages and acknowledge RabbitMQ queue', async () => {
      sendToConsumer(emailPreRendererItem())

      await emailComposer()

      expect(ackStub).toBeCalled()
    })
    describe('Mount HTML', () => {
      it.skip('Correctly mounts HTML with subscriber information', async () => {
        const queueMock = emailPreRendererItem()
        sendToConsumer(queueMock)
        const [email, { footerHTML, headerHTML }] = Object.entries(queueMock)[0]
        const filterRolesReturnMock = faker.string.sample()
        filterRolesStub.mockResolvedValue(filterRolesReturnMock)

        await emailComposer()

        //sendToQueueStub.mockImplementation((...args: unknown[]) => console.log('aa', args))
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

    describe.skip('Send HTML to Queue', () => {
      it('Sends the HTML to the "email-render-queue" on RabbitMQ', () => {
        // Implement test to verify if the static HTML is sent to the correct RabbitMQ queue
      })
    })
  })
})
