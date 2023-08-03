import { vi } from 'vitest'

process.env['RABBITMQ_DEFAULT_USER'] = 'RABBITMQ_DEFAULT_USER'
process.env['RABBITMQ_DEFAULT_PASS'] = 'RABBITMQ_DEFAULT_PASS'
process.env['RESEND_KEY'] = 'RESEND_KEY'

vi.mock('resend', () => ({
  Resend: class Resend {
    public emails = {
      send: () => undefined,
    }
  },
}))
