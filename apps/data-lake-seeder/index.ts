import { createClient } from '@supabase/supabase-js'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import * as fs from 'fs'
import { stringify } from 'csv-stringify/sync'

// AWS configuration
const REGION = 'us-east-1'
const BUCKET_NAME = 'teomewhy-datalake-raw'
const BUCKET_FOLDER = 'trampar_de_casa'

// Supabase configuration
const SUPABASE_URL = process.env.SUPABASE_URL
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

// AWS credentials
const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID
const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY

if (
  !AWS_ACCESS_KEY_ID ||
  !AWS_SECRET_ACCESS_KEY ||
  !SUPABASE_URL ||
  !SUPABASE_SERVICE_ROLE_KEY
) {
  throw new Error('Required environment variables are not set.')
}

// Create Supabase client with service role key
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
})

// Create S3 client
const s3Client = new S3Client({
  region: REGION,
  credentials: {
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
  },
})

function generateFileName(): string {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  const hour = String(now.getHours()).padStart(2, '0')
  const minutes = String(now.getMinutes()).padStart(2, '0')

  return `roles/${year}${month}${day}_${hour}${minutes}.csv`
}

async function fetchRolesAndCreateCSV(): Promise<string> {
  // Fetch data from Supabase
  const { data, error } = await supabase.from('Roles').select('*')

  if (error) throw error

  // Generate CSV content
  const csvContent = stringify(data, { header: true })

  // Write CSV to a temporary file
  const tempFilePath = `/tmp/roles_${Date.now()}.csv`
  fs.writeFileSync(tempFilePath, csvContent)

  return tempFilePath
}

async function uploadFileToS3(filePath: string, fileName: string) {
  try {
    const fileContent = fs.readFileSync(filePath)

    const params = {
      Bucket: BUCKET_NAME,
      Key: `${BUCKET_FOLDER}/${fileName}`,
      Body: fileContent,
      ContentType: 'text/csv',
    }

    const command = new PutObjectCommand(params)
    const response = await s3Client.send(command)

    console.log(
      `File uploaded successfully to ${BUCKET_NAME}/${BUCKET_FOLDER}/${fileName}. ETag: ${response.ETag}`
    )
  } catch (err) {
    console.error('Error', err)
  }
}

async function main() {
  try {
    // Fetch data and create CSV
    const csvFilePath = await fetchRolesAndCreateCSV()

    // Generate filename
    const fileName = generateFileName()

    // Upload the file to S3
    await uploadFileToS3(csvFilePath, fileName)

    // Clean up the temporary file
    fs.unlinkSync(csvFilePath)
  } catch (error) {
    console.error('Error:', error.message)
  }
}

main()
