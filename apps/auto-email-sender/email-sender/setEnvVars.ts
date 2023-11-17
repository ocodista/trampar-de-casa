import { vi } from 'vitest'

process.env['RABBITMQ_ADDRESS'] = 'RABBITMQ_ADDRESS'
process.env['RESEND_KEY'] = 'RESEND_KEY'

export const emailsObjectMock = {
  send: () => undefined,
}
class Resend {
  public emails = emailsObjectMock
}
vi.mock('resend', () => ({
  Resend: Resend,
}))
