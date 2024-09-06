import path from 'path'
import os from 'os'
import { exec } from 'child_process'
import { promisify } from 'util'

import { rolesRenderer } from './roles-renderer'
import { subsToQueue } from './subs-to-queue'
import { composeEmail } from './email-composer'
import { checkMatchRolesUp } from './utils/checkMatchRolesUp'
import { emailSender } from './email-sender'
import { setupDataMatchRoles } from './utils/generateDataMatchRoles'
import { spawnPromise } from './utils/spawnPromise'

const runCommand = promisify(exec)
const numCores = os.availableParallelism()

export const init = async () => {
  const matchRolesPath = path.resolve(__dirname, 'match_roles')

  try {
    console.time('auto-email-sender startup time')
    console.log('Generating data')
    await setupDataMatchRoles()

    console.log('Training')
    await runCommand(
      'bash -c "source matchenv/bin/activate && cd src/train && python3 onehot.py --entity skills"',
      {
        cwd: matchRolesPath,
      }
    )

    console.log('Starting match_roles')
    runCommand(
      `bash -c "source matchenv/bin/activate && cd src && uvicorn main:app --host 0.0.0.0 --workers ${numCores}"`,
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
    console.time('subsToQueue time')
    await subsToQueue()
    console.timeEnd('subsToQueue time')

    console.log('Starting rolesRenderer...')
    console.time('rolesRenderer time')
    await rolesRenderer()
    console.timeEnd('rolesRenderer time')

    console.log('Starting assignRoles...')
    console.time('runParallelAssignRoles time')
    await runParallelAssignRoles()
    console.timeEnd('runParallelAssignRoles time')

    console.log('Starting emailPreRender...')
    console.time('runParallelEmailPreRender time')
    await runParallelEmailPreRender()
    console.timeEnd('runParallelEmailPreRender time')

    console.log('Starting composeEmail...')
    console.time('composeEmail time')
    await composeEmail()
    console.timeEnd('composeEmail time')

    console.log('Starting emailSender...')
    console.time('emailSender time')
    await emailSender()
    console.timeEnd('emailSender time')

    console.timeEnd('auto-email-sender startup time')
    process.exit(0)
  } catch (error) {
    console.error('Error during execution: ', error)
    process.exit(1)
  }
}

const scriptsPath = path.resolve(__dirname, 'utils')

const runParallelAssignRoles = async () => {
  const tasks = Array(numCores)
    .fill(null)
    .map(() =>
      spawnPromise('ts-node', [path.join(scriptsPath, 'assignRolesWorker.ts')])
    )
  try {
    await Promise.all(tasks)
  } catch (err: any) {
    console.error('Error running parallel assignRoles workers:', err)
  }
}

const runParallelEmailPreRender = async () => {
  const tasks = Array(numCores)
    .fill(null)
    .map(() =>
      spawnPromise('ts-node', [
        path.join(scriptsPath, 'emailPreRenderWorker.ts'),
      ])
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
