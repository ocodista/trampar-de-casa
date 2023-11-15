import {
  ackStub,
  channelMock,
  nackStub,
} from 'shared/src/test/helpers/rabbitMQ'
import { EMAIL_FROM } from 'src/baseEmail'
import { sendEmails } from 'src/sendEmails'
import { messageFactory } from './factories/messageFactory'
import { resendMockFactory } from './factories/resendFactory'

describe('Send Emails', () => {
  it('uses resend to send email chunk', () => {
    const { messageMock, emailMock, htmlMock, subjectMock } = messageFactory()
    const { resendMock, sendSpy } = resendMockFactory()

    sendEmails([messageMock], channelMock, resendMock)

    expect(sendSpy).toBeCalledWith({
      from: EMAIL_FROM,
      to: emailMock,
      html: htmlMock,
      subject: subjectMock,
    })
  })

  describe('after execute send function', () => {
    it('nAck message if send function throws some error', async () => {
      const { messageMock } = messageFactory()
      const { resendMock, sendSpy } = resendMockFactory()
      sendSpy.mockImplementation(() => {
        throw new Error('Generic error')
      })

      await sendEmails([messageMock], channelMock, resendMock)

      expect(nackStub).toBeCalledWith(messageMock, false, true)
    })

    it('ack message if send function execute with success', async () => {
      const { messageMock } = messageFactory()
      const { resendMock } = resendMockFactory()

      await sendEmails([messageMock], channelMock, resendMock)

      expect(ackStub).toBeCalledWith(messageMock)
    })
  })
})
