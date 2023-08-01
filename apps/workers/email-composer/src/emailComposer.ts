import { EmailQueues } from 'shared/src/enums/emailQueues'
import { connectToQueue } from 'shared/src/queue/connectToQueue'
import { CONFIG } from '../config'
export const emailComposer = async () => {
  const connect = await connectToQueue({
    password: CONFIG.RABBITMQ_PASS,
    user: CONFIG.RABBITMQ_USER,
  })

  await connect.assertQueue(EmailQueues.EmailPreRenderer)

  return null
}
