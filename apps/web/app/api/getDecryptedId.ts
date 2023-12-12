import { decrypt } from 'shared/src/security'

export const getDecryptedId = (hashedId: string) => {
  try {
    const decryptedId = decrypt(process.env['CRYPT_SECRET'], hashedId)

    return decryptedId
  } catch {
    throw new Error('Link inválido.')
  }
}
