import { composeEmail } from './emailComposer'
;(async () => {
  console.time('composeEmail')
  try {
    await composeEmail()
  } catch (error) {
    console.log('Error composing email!', error)
  } finally {
    console.timeEnd('composeEmail')
  }
})()
