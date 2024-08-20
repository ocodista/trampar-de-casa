import { exec } from 'child_process'
import { promisify } from 'util'
import { rolesRenderer } from './roles-renderer'
import { subsToQueue } from './subs-to-queue'
import { composeEmail } from './email-composer'
import { checkMatchRolesUp } from './utils/checkMatchRolesUp'
import path from 'path'
import os from 'os'

const execPromise = promisify(exec)
const numCores = os.availableParallelism()
const runCommand = promisify(exec)

export const init = async () => {
  const matchRolesPath = path.resolve(
    'apps/auto-email-sender-new/src/match_roles'
  )
  try {
    console.log('Starting match_roles')
    runCommand(
      'bash -c "source matchenv/bin/activate && cd src && uvicorn --host 0.0.0.0 main:app"',
      {
        cwd: matchRolesPath,
      }
    )

    console.log('Waiting for match_roles to be up')
    await checkMatchRolesUp(
      'http://127.0.0.1:8000/best_role?skills=25%2C40%2C450&languages=English%2CPortuguese&n=2'
    )
    console.log('match_roles is up and running.')

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
  const tasks = Array(numCores)
    .fill(null)
    .map(() =>
      execPromise(
        'ts-node apps/auto-email-sender-new/src/utils/assignRolesWorker.ts'
      )
    )
  try {
    await Promise.all(tasks)
  } catch (err: any) {
    throw new Error(
      'Error running parallel assignRoles workers: ' + err.message
    )
  }
}

const runParallelEmailPreRender = async () => {
  const tasks = Array(numCores)
    .fill(null)
    .map(() =>
      execPromise(
        'ts-node apps/auto-email-sender-new/src/utils/emailPreRenderWorker.ts'
      )
    )
  try {
    await Promise.all(tasks)
  } catch (err: any) {
    throw new Error(
      'Error running parallel emailPreRender workers: ' + err.message
    )
  }
}

init()
