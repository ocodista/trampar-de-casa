import dotenv from 'dotenv'
import { encrypt } from './src/security/encrypt'
dotenv.config()
console.log(
  encrypt(
    process.env['CRYPT_SECRET'] as string,
    '90e155b3-a855-4954-ad4c-69b830e8421f'
  )
)
;(() => {
  return
})()
