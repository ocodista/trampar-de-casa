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
} from './helpers/rabbitMQ'

const connectToQueueStub = vi.fn()
const filterRolesStub = vi.fn()
describe('Email Composer Service Tests', () => {
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
      consumerStub.mockImplementationOnce((_, onMessage) => {
        onMessage({
          content: Buffer.from(JSON.stringify(queueMock)),
        })
      })

      await emailComposer()

      expect(filterRolesStub).toBeCalled()
    })

    it('process messages and acknowledge RabbitMQ queue', async () => {
      consumerStub.mockImplementationOnce((_, onMessage) => {
        onMessage({
          content: Buffer.from(JSON.stringify(emailPreRendererItem())),
        })
      })

      await emailComposer()

      expect(ackStub).toBeCalled()
    })
    describe.skip('Mount HTML', () => {
      it('Correctly mounts HTML with subscriber information', () => {
        // Implement test to verify if the static HTML is correctly mounted with subscriber information
      })
    })

    describe.skip('Send HTML to Queue', () => {
      it('Sends the HTML to the "email-render-queue" on RabbitMQ', () => {
        // Implement test to verify if the static HTML is sent to the correct RabbitMQ queue
      })
    })
  })
})
