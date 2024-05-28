import { createCipheriv, randomBytes } from 'crypto'

export const encrypt = (secretKey: string, text: string): string => {
  const iv = randomBytes(16)
  const cipher = createCipheriv(
    'aes-256-cbc',
    Buffer.from(secretKey, 'hex'),
    iv
  )
  let encrypted = cipher.update(text)
  encrypted = Buffer.concat([encrypted, cipher.final()])
  return encodeURIComponent(
    iv.toString('hex') + ':' + encrypted.toString('hex')
  )
}
