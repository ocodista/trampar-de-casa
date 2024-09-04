import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import * as fs from 'fs'

// AWS configuration
const REGION = 'us-east-1'
const BUCKET_NAME = 'teomewhy-datalake-raw'
const BUCKET_FOLDER = 'trampar_de_casa'

// Read AWS credentials from Bun.env
const AWS_ACCESS_KEY_ID = Bun.env.AWS_ACCESS_KEY_ID
const AWS_SECRET_ACCESS_KEY = Bun.env.AWS_SECRET_ACCESS_KEY

if (!AWS_ACCESS_KEY_ID || !AWS_SECRET_ACCESS_KEY) {
  throw new Error('AWS credentials are not set in the environment variables.')
}

// Create an S3 client with the credentials from environment variables
const s3Client = new S3Client({
  region: REGION,
  credentials: {
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
  },
})

async function uploadFileToS3(filePath: string, fileName: string) {
  try {
    // Read the file
    const fileContent = fs.readFileSync(filePath)

    // Set up the parameters for the upload
    const params = {
      Bucket: BUCKET_NAME,
      Key: `${BUCKET_FOLDER}/${fileName}`,
      Body: fileContent,
      ContentType: 'text/csv',
    }

    // Upload the file
    const command = new PutObjectCommand(params)
    const response = await s3Client.send(command)

    console.log(
      `File uploaded successfully to ${BUCKET_NAME}/${BUCKET_FOLDER}/${fileName}. ETag: ${response.ETag}`
    )
  } catch (err) {
    console.error('Error', err)
  }
}

// Usage
const csvFilePath = 'roles.csv'
const fileName = 'roles.csv' // The filename to use in S3

uploadFileToS3(csvFilePath, fileName)
