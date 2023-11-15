import { emailPreRender } from './emailPreRender'

emailPreRender()
  .then(() => console.log('Finished!'))
  .catch((e) => console.log('error,', e))
