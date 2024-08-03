import path from 'path'
import { Parser } from '@json2csv/plainjs'
import fs from 'fs'
import { getSupabaseClient } from 'db'
import { exec } from 'child_process'
import { promisify } from 'util'
import axios from 'axios'

const generateCsv = async (data: any, filePath: string) => {
  const parser = new Parser()
  const csv = parser.parse(data.data)
  const absolutePath = path.resolve(
    'apps/auto-email-sender-new/src/match_roles/data',
    filePath
  )
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

export const setupMatchRoles = async () => {
  const supabaseClient = getSupabaseClient()
  const matchRolesPath = path.resolve(
    'apps/auto-email-sender-new/src/match_roles'
  )

  const roles = await supabaseClient.from('Roles').select('*').eq('ready', true)
  await generateCsv(roles, 'roles.csv')

  const skills = await supabaseClient.from('Skills').select('*')
  await generateCsv(skills, 'skills.csv')

  console.log('Generating matchenv...')
  await runCommand('bash -c "python3 -m venv matchenv"', {
    cwd: matchRolesPath,
  })

  console.log('Install dependencies...')
  await runCommand(
    'bash -c "source matchenv/bin/activate && pip install -r requirements.txt"',
    {
      cwd: matchRolesPath,
    }
  )

  console.log('Generating onehot from skills...')
  await runCommand(
    'bash -c "source matchenv/bin/activate && cd src/train && python3 onehot.py --entity skills"',
    {
      cwd: matchRolesPath,
    }
  )

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
}
