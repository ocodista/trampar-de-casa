import { exec } from 'child_process'
import { promisify } from 'util'
import { setupMatchRoles } from 'shared/src/services/setupMatchRoles'
import { rolesRenderer } from './roles-renderer'
import { subsToQueue } from './subs-to-queue'
import { composeEmail } from './email-composer'
import { createRabbitMqChannel } from 'shared'

const execPromise = promisify(exec)

export const init = async () => {
  try {
    // console.log('Starting match_roles');
    // await setupMatchRoles();
    // console.log('match_roles completed.');

    console.log('Starting subsToQueue...')
    await subsToQueue()
    console.log('subsToQueue completed.')

    console.log('Starting rolesRenderer...')
    await rolesRenderer()
    console.log('rolesRenderer completed.')

    console.log('Starting assignRoles...')
    await runParallelAssignRoles()
    console.log('assignRoles completed.')

    console.log('Starting emailPreRender...')
    await runParallelEmailPreRender()
    console.log('emailPreRender completed.')

    console.log('Starting composeEmail...')
    await composeEmail()
    console.log('composeEmail completed.')

    // console.log('Starting emailSender...');
    // await emailSender();
    // console.log('emailSender completed.');

    console.log('Process completed successfully.')
    process.exit(0)
  } catch (error) {
    console.error('Error during execution: ', error)
    process.exit(1)
  }
}

const runParallelAssignRoles = async () => {
  const tasks = Array(4)
    .fill(null)
    .map(() => execPromise('ts-node src/utils/assignRolesWorker.ts'))
  try {
    await Promise.all(tasks)
  } catch (err: any) {
    throw new Error(
      'Error running parallel assignRoles workers: ' + err.message
    )
  }
}

const runParallelEmailPreRender = async () => {
  const tasks = Array(4)
    .fill(null)
    .map(() => execPromise('ts-node src/utils/emailPreRenderWorker.ts'))
  try {
    await Promise.all(tasks)
  } catch (err: any) {
    throw new Error(
      'Error running parallel emailPreRender workers: ' + err.message
    )
  }
}

init()
