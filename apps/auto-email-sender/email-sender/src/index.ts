import { emailSender } from './emailSender'

emailSender()
  .catch((e) => console.log('email sender service error:', e))
  .finally(() => process.exit(0))
