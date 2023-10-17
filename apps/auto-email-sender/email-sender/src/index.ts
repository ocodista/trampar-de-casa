import { emailSender } from './emailSender'

emailSender().catch((e) => {
  throw e
})
