import path from 'path'
import os from 'os'
import { exec } from 'child_process'
import { promisify } from 'util'
import axios from 'axios'
import readline from 'readline'

import { rolesRenderer } from './roles-renderer'
import { subsToQueue } from './subs-to-queue'
import { composeEmail } from './email-composer'
import { checkMatchRolesUp } from './utils/checkMatchRolesUp'
import { emailSender } from './email-sender'
import { spawnPromise } from './utils/spawnPromise'

const runCommand = promisify(exec)
const numCores = os.availableParallelism()

// Match roles service configuration
const MATCH_ROLES_URL = process.env.MATCH_ROLES_URL || 'http://match-roles:8000'

const syncMatchRolesData = async () => {
  try {
    console.log('🔄 Syncing match_roles data from PostgreSQL...')
    const response = await axios.post(`${MATCH_ROLES_URL}/sync-data`)
    console.log('✅ Data sync completed successfully')
    console.log('Sync response:', JSON.stringify(response.data, null, 2))
    return response.data
  } catch (error: any) {
    console.error('❌ Data sync failed:', error)
    throw new Error(`Failed to sync match_roles data: ${error}`)
  }
}

const waitForUserConfirmation = async (emailCount: number): Promise<void> => {
  return new Promise((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    })

    console.log(`\n🚨 READY TO SEND ${emailCount} EMAILS 🚨`)
    console.log('Press ENTER to continue or Ctrl+C to abort...')

    rl.question('', () => {
      rl.close()
      resolve()
    })

    process.on('SIGINT', () => {
      console.log('\n❌ Aborted by user')
      rl.close()
      process.exit(0)
    })
  })
}

export const init = async () => {
  try {
    console.time('auto-email-sender startup time')
    console.log('=== AUTO-EMAIL-SENDER STARTUP ===')

    console.log(
      `\n[STEP 1/8] Waiting for match_roles to be up at ${MATCH_ROLES_URL}`
    )
    const healthCheckResponse = await checkMatchRolesUp(
      `${MATCH_ROLES_URL}/best_role?skills=25%2C40%2C450&languages=English%2CPortuguese&n=2`
    )
    console.log('✅ match_roles is up and running')
    console.log(
      'Health check response:',
      JSON.stringify(healthCheckResponse, null, 2)
    )

    console.log(
      `\n[STEP 2/8] Syncing latest roles data from PostgreSQL to match_roles`
    )
    const syncResponse = await syncMatchRolesData()
    console.log('✅ Data sync completed')
    console.log('Sync response:', JSON.stringify(syncResponse, null, 2))

    console.log('\n[STEP 3/8] Starting subsToQueue...')
    console.time('subsToQueue time')
    const subsResult = await subsToQueue()
    console.timeEnd('subsToQueue time')
    console.log('✅ subsToQueue completed')
    console.log('subsToQueue result:', JSON.stringify(subsResult, null, 2))

    console.log('\n[STEP 4/8] Starting rolesRenderer...')
    console.time('rolesRenderer time')
    const rolesRendererResult = await rolesRenderer()
    console.timeEnd('rolesRenderer time')
    console.log('✅ rolesRenderer completed')
    console.log(
      'rolesRenderer result:',
      JSON.stringify(rolesRendererResult, null, 2)
    )

    console.log('\n[STEP 5/8] Starting assignRoles...')
    console.time('runParallelAssignRoles time')
    const assignRolesResult = await runParallelAssignRoles()
    console.timeEnd('runParallelAssignRoles time')
    console.log('✅ assignRoles completed')
    console.log(
      'assignRoles result:',
      JSON.stringify(assignRolesResult, null, 2)
    )

    console.log('\n[STEP 6/8] Starting emailPreRender...')
    console.time('runParallelEmailPreRender time')
    const emailPreRenderResult = await runParallelEmailPreRender()
    console.timeEnd('runParallelEmailPreRender time')
    console.log('✅ emailPreRender completed')
    console.log(
      'emailPreRender result:',
      JSON.stringify(emailPreRenderResult, null, 2)
    )

    console.log('\n[STEP 7/8] Starting composeEmail...')
    console.time('composeEmail time')
    const composeEmailResult = await composeEmail()
    console.timeEnd('composeEmail time')
    console.log('✅ composeEmail completed')
    console.log(
      'composeEmail result:',
      JSON.stringify(composeEmailResult, null, 2)
    )

    console.log(
      '\n[STEP 8/8] Checking email queue and waiting for confirmation...'
    )

    // Check how many emails are in the queue
    const { createRabbitMqChannel } = await import(
      'shared/src/queue/createRabbitMqChannel'
    )
    const { EmailQueues } = await import('shared')
    const queueChannel = await createRabbitMqChannel()
    const queueInfo = await queueChannel.checkQueue(EmailQueues.EmailSender)
    const emailCount = queueInfo.messageCount

    console.log(`📧 Found ${emailCount} emails ready to send`)

    if (emailCount > 0) {
      await waitForUserConfirmation(emailCount)
      console.log('✅ User confirmed - proceeding with email sending...')

      console.time('emailSender time')
      const emailSenderResult = await emailSender()
      console.timeEnd('emailSender time')
      console.log('✅ emailSender completed')
      console.log(
        'emailSender result:',
        JSON.stringify(emailSenderResult, null, 2)
      )
    } else {
      console.log('⚠️ No emails to send - skipping email sender step')
    }

    console.log('\n=== AUTO-EMAIL-SENDER COMPLETED SUCCESSFULLY ===')
    console.timeEnd('auto-email-sender startup time')
    process.exit(0)
  } catch (error) {
    console.error('\n❌ ERROR during execution:', error)
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
    throw new Error(
      'Failed to run parallel assignRoles workers: ' + err.message
    )
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
    console.error('Error running parallel emailPreRender workers:', err)
    throw new Error(
      'Error running parallel emailPreRender workers: ' + err.message
    )
  }
}

// Check command line arguments
const args = process.argv.slice(2)
const shouldContinue = args.includes('--continue')
const shouldCheckQueues = args.includes('--check-queues')

if (shouldCheckQueues) {
  import('./utils/checkQueues').then(({ checkQueues }) => {
    checkQueues()
      .then(() => process.exit(0))
      .catch((error) => {
        console.error('Error:', error)
        process.exit(1)
      })
  })
} else if (shouldContinue) {
  import('./utils/continueEmailSending').then(({ continueEmailSending }) => {
    continueEmailSending()
      .then(() => process.exit(0))
      .catch((error) => {
        console.error('Error:', error)
        process.exit(1)
      })
  })
} else {
  init()
}
