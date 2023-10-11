import { emailSender } from './emailSender'

emailSender()
  .catch((e) => {
    throw e
  })
  .finally(() => process.exit(0))
