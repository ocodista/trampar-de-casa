import { emailPreRender } from './emailPreRender'

emailPreRender()
  .catch((e) => {
    console.error('Email Pre Rendered Error', e)
  })
  .finally(() => {
    process.exit(0)
  })
