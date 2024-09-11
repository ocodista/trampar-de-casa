import { createDecipheriv } from 'crypto'

export const decrypt = (secretKey: string, text: string): string => {
  const textParts = decodeURIComponent(text).split(':') as string[]
  if (textParts.length < 2) return ''
  const iv = Buffer.from(textParts.shift() as string, 'hex')
  const encryptedText = Buffer.from(textParts.join(':'), 'hex')
  const keyBuffer = Buffer.from(secretKey, 'hex')
  if (keyBuffer.length !== 32) {
    throw new Error('A chave deve ter 32 bytes')
  }
  const decipher = createDecipheriv('aes-256-cbc', keyBuffer, iv)
  let decrypted = decipher.update(encryptedText)
  decrypted = Buffer.concat([decrypted, decipher.final()])
  return decrypted.toString()
}
