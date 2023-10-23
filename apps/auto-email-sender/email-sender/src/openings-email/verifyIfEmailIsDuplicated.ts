import fs from 'fs'
import path from 'path'

const emails = fs
  .readFileSync(path.resolve(__dirname, './sent-emails.txt'))
  .toString()
const emailList = emails.split('\n')
emailList.forEach((email, index) => {
  if (emailList.indexOf(email) !== index) {
    console.log(`repeated email: ${email}`)
  }
})
