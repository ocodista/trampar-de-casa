'use server'

import { GetObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { R2 } from 'shared'

export async function getResumePresignedUrl(fileName: string) {
  const command = new GetObjectCommand({
    Bucket: 'resumes-trampar-de-casa',
    Key: fileName,
  })

  return getSignedUrl(R2, command, { expiresIn: 3600 })
}
