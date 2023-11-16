import { encrypt } from '../security'

const profileUrl = (encryptedId: string) =>
  `https://www.trampardecasa.com.br/subscribers/profile/${encryptedId}`

export const createProfileFormLink = (subscriberId: string) => {
  const cryptSecret = process.env['CRYPT_SECRET']
  if (!cryptSecret) throw new Error('secret not found')

  const encryptedId = encrypt(cryptSecret, subscriberId)
  return profileUrl(encryptedId)
}
