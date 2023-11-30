import { GetMessage } from 'amqplib'
import { Collection, Document } from 'mongodb'
import { createEmailHtml } from './createEmailHtml'
import { EmailPreRenderMessage } from './emailComposer'
import { getHtmlRoles } from './getHtmlRoles'
export const rolesSubject = (roles: number) =>
  `${roles} Vagas para você Trampar de Casa`

export const parsePreRenderMessage = async (
  msgContent: GetMessage['content'],
  mongoCollection: Collection<Document>,
  memoizedRoles: Map<any, any>,
  renderedRolesHtml: string,
  renderedEmailWrapperHtml: string
): Promise<Record<string, { html: string; subject: string }>> => {
  const emailPreRender = JSON.parse(
    msgContent.toString()
  ) as EmailPreRenderMessage
  const [email] = Object.keys(emailPreRender)
  const { footerHTML, headerHTML, roles: rolesIds } = emailPreRender[email]
  const rolesHTML = await getHtmlRoles(
    rolesIds,
    mongoCollection,
    memoizedRoles,
    renderedRolesHtml
  )
  const bodyHTML = `${headerHTML}${rolesHTML}${footerHTML}`
  const renderedEmail = await createEmailHtml(
    bodyHTML,
    renderedEmailWrapperHtml
  )
  return {
    [email]: { html: renderedEmail, subject: rolesSubject(rolesIds.length) },
  }
}
