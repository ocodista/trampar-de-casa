import { emailComposer } from './emailComposer'

emailComposer().catch((error) => {
  console.log('Email composer service error', error)
})
