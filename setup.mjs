import { spawn } from 'child_process'
import { promises as fs } from 'fs'
import { fileURLToPath } from 'url'
import path from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const envFilePath = path.join(__dirname, 'apps', 'web', '.env')
const envExampleFilePath = path.join(__dirname, 'apps', 'web', '.env.example')

async function setupEnvironment() {
  try {
    await fs.access(envFilePath)
    console.log(
      'The apps/web/.env file already exists. No further action will be taken.'
    )
    return
  } catch {
    console.log('Starting setup (this may take a while)...')

    const setupProcess = spawn('yarn', ['turbo', 'run', 'setup', '--filter=db'])

    let fullOutput = ''

    setupProcess.stdout.on('data', (data) => {
      process.stdout.write(data)
      fullOutput += data.toString()
    })

    setupProcess.stderr.on('data', (data) => {
      process.stderr.write(data)
      fullOutput += data.toString()
    })

    setupProcess.on('close', async (code) => {
      if (code !== 0) {
        console.error(`turbo setup process exited with code ${code}`)
        return
      }

      console.log(
        'Setup completed. Extracting the supabase SERVICE_ROLE_KEY...'
      )
      const serviceRoleKeyMatch = fullOutput.match(/service_role key: (\S+)/)
      if (serviceRoleKeyMatch && serviceRoleKeyMatch[1]) {
        const serviceRoleKey = serviceRoleKeyMatch[1]
        console.log(
          'Supabase key extracted. Configuring the apps/web/.env file...'
        )

        try {
          await fs.copyFile(envExampleFilePath, envFilePath)
          let envContent = await fs.readFile(envFilePath, 'utf-8')
          envContent = envContent.replace(
            /^SUPABASE_SERVICE_ROLE=.*$/m,
            `SUPABASE_SERVICE_ROLE=${serviceRoleKey}`
          )
          await fs.writeFile(envFilePath, envContent)
          console.log(
            'The SUPABASE_SERVICE_ROLE has been configured in the .env file.'
          )
          console.log('\n\nSetup finished! Run yarn dev')
        } catch (err) {
          console.error('Error updating the .env file:', err)
        }
      } else {
        console.error(
          'SERVICE_ROLE_KEY was not found in the turbo setup output.'
        )
      }
    })
  }
}

setupEnvironment()
