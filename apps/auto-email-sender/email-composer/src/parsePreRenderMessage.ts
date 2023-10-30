import { GetMessage } from 'amqplib'
import { createEmailHtml } from './createEmailHtml'
import { EmailPreRenderMessage } from './emailComposer'
import { getHtmlRoles } from './getHtmlRoles'
export const rolesSubject = (roles: number) =>
  `${roles} Vagas para você Trampar de Casa`

export const parsePreRenderMessage = async (
  msgContent: GetMessage['content']
): Promise<Record<string, { html: string; subject: string }>> => {
  const emailPreRender = JSON.parse(
    msgContent.toString()
  ) as EmailPreRenderMessage
  const [email] = Object.keys(emailPreRender)
  const { footerHTML, headerHTML, roles } = emailPreRender[email]
  const rolesHTML = await getHtmlRoles(roles)
  const bodyHTML = `${headerHTML}${rolesHTML}${footerHTML}`
  const renderedEmail = await createEmailHtml(bodyHTML)
  return {
    [email]: { html: renderedEmail, subject: rolesSubject(roles.length) },
  }
}
