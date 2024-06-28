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
    await subsToQueue()

    await rolesRenderer()

    const assignRolesPromises = Array(4)
      .fill(assignRoles)
      .map((fn) => fn())
    await Promise.all(assignRolesPromises)

    const emailPreRenderPromises = Array(4)
      .fill(emailPreRender)
      .map((fn) => fn())
    await Promise.all(emailPreRenderPromises)

    await composeEmail()

    await emailSender()

    process.exit(0)
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

init()
