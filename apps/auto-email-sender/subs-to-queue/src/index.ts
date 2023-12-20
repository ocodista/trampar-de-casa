import { logger } from 'shared'
import { subsToQueue } from './subsToQueue'
;(async () => {
  await subsToQueue()
  logger('finished.')
  process.exit(0)
})()
