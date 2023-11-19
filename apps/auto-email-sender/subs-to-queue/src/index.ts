import { subsToQueue } from './subsToQueue'
;(async () => {
  await subsToQueue()
  console.log('finished.')
  process.exit(0)
})()
