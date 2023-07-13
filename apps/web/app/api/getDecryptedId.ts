import { decrypt } from 'shared/src/security'

export const getDecryptedId = (hashedId: string) => {
  return decrypt(process.env['CRYPT_SECRET'], hashedId)
}
