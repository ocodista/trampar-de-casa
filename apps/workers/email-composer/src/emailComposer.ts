import { EmailQueues } from 'shared/src/enums/emailQueues'
import { connectToQueue } from 'shared/src/queue/connectToQueue'
import { CONFIG } from '../config'
import { filterRoles } from './filterRoles'

type EmailPreRenderer = Record<
  string,
  { roles: string[]; footerHTML: string; headerHTML: string }
>

export const emailComposer = async () => {
  const channelToConsume = await connectToQueue({
    password: CONFIG.RABBITMQ_PASS,
    user: CONFIG.RABBITMQ_USER,
  })
  const channelToSend = await connectToQueue({
    password: CONFIG.RABBITMQ_PASS,
    user: CONFIG.RABBITMQ_USER,
  })
  await Promise.all([
    channelToConsume.assertQueue(EmailQueues.EmailPreRenderer),
    channelToSend.assertQueue(EmailQueues.EmailComposer),
  ])

  await channelToConsume.consume(EmailQueues.EmailPreRenderer, async (msg) => {
    if (!msg) return
    const emailPreRender = JSON.parse(
      msg.content.toString()
    ) as EmailPreRenderer
    const [email, { footerHTML, headerHTML, roles }] =
      Object.entries(emailPreRender)[0]

    const rolesHTML = await filterRoles(roles)
    channelToSend.sendToQueue(
      EmailQueues.EmailComposer,
      Buffer.from(
        JSON.stringify({ [email]: `${headerHTML}${rolesHTML}${footerHTML}` })
      )
    )

    channelToConsume.ack(msg)
  })

  return
}
