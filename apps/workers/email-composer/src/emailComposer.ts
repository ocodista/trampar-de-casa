import { EmailQueues } from 'shared/src/enums/emailQueues'
import { connectToQueue } from 'shared/src/queue/connectToQueue'
import { CONFIG } from '../config'
import { filterRoles } from './filterRoles'

type EmailPreRenderer = Record<
  string,
  { roles: string[]; footerHTML: string; headerHTML: string }
>

export const emailComposer = async () => {
  const channel = await connectToQueue({
    password: CONFIG.RABBITMQ_PASS,
    user: CONFIG.RABBITMQ_USER,
  })

  await channel.assertQueue(EmailQueues.EmailPreRenderer)

  channel.consume(EmailQueues.EmailPreRenderer, async (msg) => {
    if (!msg) return
    const emailPreRender = JSON.parse(
      msg.content.toString()
    ) as EmailPreRenderer
    const [, props] = Object.entries(emailPreRender)[0]

    const sanitizedRoles = await filterRoles(props.roles)
    channel.ack(msg)
  })

  return
}
