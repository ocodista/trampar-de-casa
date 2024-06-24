import dotenv from 'dotenv'
import { rolesRenderer } from './roles-renderer'
import { subsToQueue } from './subs-to-queue'
import 'why-is-node-running'
import { assignRoles } from './roles-assigner'

dotenv.config()

export const init = async () => {
  try {
    console.log('init')

    console.log('subsToQueue started')
    await subsToQueue()
    console.log('subsToQueue finished')

    console.log('rolesRenderer started')
    await rolesRenderer()
    console.log('rolesRenderer finished')

    console.log('assignRoles started')
    const assignRolesPromises = Array(4)
      .fill(assignRoles)
      .map((fn) => fn())
    await Promise.all(assignRolesPromises)
    console.log('assignRoles finished')

    process.exit(0)
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

init()
