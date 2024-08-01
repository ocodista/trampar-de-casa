import { rolesRenderer } from './roles-renderer'
import { subsToQueue } from './subs-to-queue'
import { assignRoles } from './roles-assigner-new'
import { emailPreRender } from './email-pre-render'
import { composeEmail } from './email-composer'
import { emailSender } from './email-sender'
import { getSupabaseClient } from 'db'
import { Parser } from '@json2csv/plainjs'
import fs from 'fs'
import { exec } from 'child_process'
import { promisify } from 'util'
import path from 'path'
import axios from 'axios'

const generateCsv = async (data: any, filePath: string) => {
  const parser = new Parser()
  const csv = parser.parse(data.data)
  const absolutePath = path.resolve(__dirname, filePath)
  fs.writeFileSync(absolutePath, csv)
}

const runCommand = promisify(exec)

const checkMatchRolesUp = async (
  url: string,
  maxAttempts = 10,
  interval = 5000
) => {
  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms))
  let attempt = 0
  while (attempt < maxAttempts) {
    try {
      const response = await axios.get(url)
      if (response.status === 200) {
        console.log('match_roles is up.')
        return
      }
    } catch (error) {
      console.error(`Error checking match_roles: ${error}`)
    }
    attempt++
    console.log(
      `Attempt ${attempt} failed. Retrying in ${interval / 1000} seconds...`
    )
    await delay(interval)
  }
  throw new Error(`match_roles did not start after ${maxAttempts} attempts.`)
}

export const init = async () => {
  const supabaseClient = getSupabaseClient()

  try {
    const roles = await supabaseClient
      .from('Roles')
      .select('*')
      .eq('ready', true)

    await generateCsv(roles, './match_roles/data/roles.csv')

    const skills = await supabaseClient.from('Skills').select('*')

    await generateCsv(skills, './match_roles/data/skills.csv')

    const matchRolesPath = path.join(__dirname, 'match_roles')

    console.log('Generating onehot from skills...')
    await runCommand('bash -c "python3 onehot.py --entity skills"', {
      cwd: `${matchRolesPath}/src/train`,
    })

    console.log('Starting match_roles')
    runCommand('bash -c "uvicorn --host 0.0.0.0 main:app"', {
      cwd: `${matchRolesPath}/src`,
    })

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
    console.error('Error during execution: ', error)
    process.exit(1)
  }
}

init()
