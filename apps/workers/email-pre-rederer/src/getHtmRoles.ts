import { UiRoutes, encrypt } from 'shared'
// TODO: throw a error if not has "SECRET_KEY" env
export function getUnsubscribeLink(url: string, id: string) {
  const secretKey = process.env['SECRET_KEY'] || ''
  const encryptedId = encrypt(secretKey, id)

  return `${url}${UiRoutes.OptOut}/${encryptedId}`
}
