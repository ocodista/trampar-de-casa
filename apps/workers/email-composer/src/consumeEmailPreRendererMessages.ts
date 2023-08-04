import { ConsumeMessage, GetMessage } from 'amqplib'
import { getHtmlRoles } from './getHtmlRoles'

export type EmailPreRenderer = Record<
  string,
  { roles: string[]; footerHTML: string; headerHTML: string }
>

const sanitizeMessageContent = (msgContent: GetMessage['content']) => {
  const emailPreRender = JSON.parse(msgContent.toString()) as EmailPreRenderer
  const [email] = Object.keys(emailPreRender)
  const { footerHTML, headerHTML, roles } = emailPreRender[email]

  return {
    footerHTML,
    headerHTML,
    roles,
    email,
  }
}
export const consumeEmailPreRendererMessages =
  (sendToEmailComposerQueue: (props: Record<string, string>) => void) =>
  async (msg: ConsumeMessage | null) => {
    if (!msg) return
    const { email, footerHTML, headerHTML, roles } = sanitizeMessageContent(
      msg.content
    )
    const rolesHTML = await getHtmlRoles(roles)

    sendToEmailComposerQueue({
      [email]: `${headerHTML}${rolesHTML}${footerHTML}`,
    })
  }
