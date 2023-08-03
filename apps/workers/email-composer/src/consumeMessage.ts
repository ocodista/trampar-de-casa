import { Channel, ConsumeMessage } from 'amqplib'
import { EmailQueues } from 'shared'
import { filterRoles } from './filterRoles'

type EmailPreRenderer = Record<
  string,
  { roles: string[]; footerHTML: string; headerHTML: string }
>

export const consumeMessage =
  (channelToSend: Channel, channelToConsume: Channel) =>
  async (msg: ConsumeMessage | null) => {
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
  }
