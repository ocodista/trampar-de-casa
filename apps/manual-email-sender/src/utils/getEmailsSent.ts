import { readFileSync } from 'fs'
import path from 'node:path'

export const getEmailsSent = (selectedDate: string) => {
  const successEmailsPath = path.resolve(
    __dirname,
    `../openings-email/${selectedDate}/sent-emails.txt`
  )

  return readFileSync(successEmailsPath, 'utf8').split('\n')
}
