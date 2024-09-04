import { UiRoutes, encrypt } from 'shared'
export const SECRET_KEY_ERROR_MESSAGE = 'SECRET_KEY env is not settled'

export function getUnsubscribeLink(url: string, id: string) {
  const secretKey = process.env['SECRET_KEY'] || ''
  if (!secretKey) throw new Error(SECRET_KEY_ERROR_MESSAGE)
  const encryptedId = encrypt(secretKey, id)

  return `${url}${UiRoutes.OptOut}/${encryptedId}`
}
