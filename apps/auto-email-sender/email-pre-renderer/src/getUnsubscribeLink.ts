import { UiRoutes, encrypt } from 'shared'
export const CRYPT_SECRET_ERROR_MESSAGE = 'CRYPT_SECRET env is not settled'

export function getUnsubscribeLink(url: string, id: string) {
  const secretKey = process.env['CRYPT_SECRET'] || ''
  if (!secretKey) throw new Error(CRYPT_SECRET_ERROR_MESSAGE)
  const encryptedId = encrypt(secretKey, id)

  return `${url}${UiRoutes.OptOut}/${encryptedId}`
}
