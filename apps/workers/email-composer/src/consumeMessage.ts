import { GetMessage } from 'amqplib'

type EmailPreRenderer = Record<
  string,
  { roles: string[]; footerHTML: string; headerHTML: string }
>

export type ConsumeMessageReturn = {
  email: string
  footerHTML: string
  headerHTML: string
  roles: string[]
}

export const consumeMessage = async (
  msg: GetMessage | false
): Promise<ConsumeMessageReturn | undefined> => {
  if (!msg) return
  const emailPreRender = JSON.parse(msg.content.toString()) as EmailPreRenderer
  const [email, { footerHTML, headerHTML, roles }] =
    Object.entries(emailPreRender)[0]

  return { email, footerHTML, headerHTML, roles }
}
