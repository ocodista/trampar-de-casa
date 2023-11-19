import { exec } from 'child_process'
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
    exec('turbo setup --concurrency 20', async (error, stdout, stderr) => {
      if (error) {
        console.error(`Error occurred during turbo setup: ${error.message}`)
        return
      }
      if (stderr) {
        console.error(`Stderr from turbo setup: ${stderr}`)
        return
      }

      console.log('Extracting the supabase SERVICE_ROLE_KEY...')
      const serviceRoleKeyMatch = stdout.match(/service_role key: (\S+)/)

      if (serviceRoleKeyMatch && serviceRoleKeyMatch[1]) {
        const serviceRoleKey = serviceRoleKeyMatch[1]
        console.log(
          'Supabase key extracted. Configuring the apps/web/.env file...'
        )

        try {
          await fs.copyFile(envExampleFilePath, envFilePath)
          console.log('Copied apps/web/.env.example to apps/web/.env.')

          let envContent = await fs.readFile(envFilePath, 'utf-8')
          envContent = envContent.replace(
            /^SUPABASE_SERVICE_ROLE=.*$/m,
            `SUPABASE_SERVICE_ROLE=${serviceRoleKey}`
          )
          await fs.writeFile(envFilePath, envContent)

          console.log(
            'The SUPABASE_SERVICE_ROLE has been configured in the .env file.'
          )
        } catch (err) {
          console.error('Error updating the .env file:', err)
        } finally {
          console.log('Setup finished! Run: yarn dev')
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
