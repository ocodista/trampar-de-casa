import { Resend } from 'resend'
import { vi } from 'vitest'

export const resendMockFactory = () => {
  const sendSpy = vi.fn()
  const resendMock = {
    emails: {
      send: sendSpy,
    },
  } as unknown as Resend

  return { sendSpy, resendMock }
}
