import { composeEmail } from './emailComposer'

;(async () => {
  try {
    await composeEmail()
  } catch (error) {
    console.log('Error composing email!', error)
  }
})()
