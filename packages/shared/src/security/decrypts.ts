import { createDecipheriv } from "crypto"

export const decrypt = (secretKey: string, text: string): string => {
  const textParts = decodeURIComponent(text).split(':') as string[];
  if(!textParts.length) 
    return ""

  const iv = Buffer.from(textParts.shift() as string, 'hex');
  const encryptedText = Buffer.from(textParts.join(':'), 'hex');
  const decipher = createDecipheriv('aes-256-cbc', Buffer.from(secretKey, 'hex'), iv);
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
}