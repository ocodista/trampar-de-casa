import { EmailQueues } from 'shared/src/enums/emailQueues'
import * as connectToQueueFile from 'shared/src/queue/connectToQueue'
import { emailComposer } from 'src/emailComposer'
import { vi } from 'vitest'
import { assertQueueStub, channelMock } from './helpers/rabbitMQ'
// Import relevant functions and classes from your email renderer service here
// import {
//   getEmailSubscriberInfo,
//   verifyRolesValidity,
//   mountStaticHtml,
//   sendHtmlToQueue,
// } from './email-renderer-service';

const connectToQueueStub = vi.fn()

describe('Email Composer Service Tests', () => {
  beforeEach(() => {
    vi.spyOn(connectToQueueFile, 'connectToQueue').mockImplementation(
      connectToQueueStub
    )
    connectToQueueStub.mockResolvedValue(channelMock)
    // Add any setup logic if required before each test
  })

  it('establish connection with rabbitMQ', async () => {
    await emailComposer()

    expect(connectToQueueStub).toBeCalled()
  })
  it(`Gets subscriber information from the ${EmailQueues.EmailPreRenderer} queue`, async () => {
    await emailComposer()

    expect(assertQueueStub).toBeCalledWith(EmailQueues.EmailPreRenderer)
  })

  it('Verifies roles validity based on Supabase search', () => {
    // Implement test to verify if the roles are valid based on Supabase search
  })

  describe('Mount HTML', () => {
    it('Correctly mounts HTML with subscriber information', () => {
      // Implement test to verify if the static HTML is correctly mounted with subscriber information
    })
  })

  describe('Send HTML to Queue', () => {
    it('Sends the HTML to the "email-render-queue" on RabbitMQ', () => {
      // Implement test to verify if the static HTML is sent to the correct RabbitMQ queue
    })
  })
})
