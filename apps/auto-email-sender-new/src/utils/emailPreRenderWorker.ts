import { emailPreRender } from '../email-pre-render'
;(async () => {
  try {
    await emailPreRender()
    console.log('emailPreRender completed.')
    process.exit(0)
  } catch (error) {
    console.error('Error in emailPreRenderWorker: ', error)
    process.exit(1)
  }
})()
