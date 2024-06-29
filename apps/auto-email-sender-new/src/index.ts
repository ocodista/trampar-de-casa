import dotenv from 'dotenv'
import { rolesRenderer } from './roles-renderer'
import { subsToQueue } from './subs-to-queue'
import { assignRoles } from './roles-assigner'
import { emailPreRender } from './email-pre-render'
import { composeEmail } from './email-composer'
import { emailSender } from './email-sender'

dotenv.config()

export const init = async () => {
  try {
    console.log('Starting subsToQueue...')
    await subsToQueue()
    console.log('subsToQueue completed.')

    console.log('Starting rolesRenderer...')
    await rolesRenderer()
    console.log('rolesRenderer completed.')

    console.log('Starting assignRoles...')
    const assignRolesPromises = Array(4)
      .fill(assignRoles)
      .map((fn) => {
        console.log('Starting assignRoles...')
        return fn()
      })
    await Promise.all(assignRolesPromises)
    console.log('assignRoles completed.')

    console.log('Starting emailPreRender...')
    const emailPreRenderPromises = Array(4)
      .fill(emailPreRender)
      .map((fn) => {
        console.log('Starting emailPreRender...')
        return fn()
      })
    await Promise.all(emailPreRenderPromises)
    console.log('emailPreRender completed.')

    console.log('Starting composeEmail...')
    await composeEmail()
    console.log('composeEmail completed.')

    console.log('Starting emailSender...')
    await emailSender()
    console.log('emailSender completed.')

    console.log('Process completed successfully.')
    process.exit(0)
  } catch (error) {
    console.error('Error during execution:', error)
    process.exit(1)
  }
}

init()
