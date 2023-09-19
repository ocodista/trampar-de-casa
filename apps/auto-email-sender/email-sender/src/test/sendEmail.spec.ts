import fsFile from 'node:fs'
import { Emails } from 'resend/build/src/emails/emails'
import { sendEmail } from 'src/sendEmail'
import { vi } from 'vitest'
import { emailComposerItem } from './factories/emailComposerItem'

describe('send email', () => {
  const sendStub = vi.fn()
  const emailsSendStub = vi.fn()
  const emailsMock: Emails = {
    send: emailsSendStub,
  } as unknown as Emails
  const appendFileSyncStub = vi.fn()

  beforeEach(() => {
    vi.spyOn(fsFile, 'appendFileSync').mockImplementation(appendFileSyncStub)
  })

  it('save email if resend throws a exception', async () => {
    const emailComposerItemMock = emailComposerItem()
    const [email, html] = Object.entries(emailComposerItemMock)[0]
    sendStub.mockImplementation(() => {
      throw new Error('Generic error')
    })

    await sendEmail(emailsMock, email, html)

    expect(appendFileSyncStub).toBeCalled()
  })
  it('save email if resend sends email successfully', async () => {
    const emailComposerItemMock = emailComposerItem()
    const [email, html] = Object.entries(emailComposerItemMock)[0]

    await sendEmail(emailsMock, email, html)

    expect(appendFileSyncStub).toBeCalled()
  })
})
