import { assignRoles } from '../roles-assigner-new'

;(async () => {
  try {
    await assignRoles()
    console.log('assignRoles completed.')
    process.exit(0)
  } catch (error) {
    console.error('Error in assignRolesWorker: ', error)
    process.exit(1)
  }
})()
