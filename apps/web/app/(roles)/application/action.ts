'use server'

import { Database, getSupabaseClient } from 'db'
import { R2 } from 'shared'
import { PutObjectCommand } from '@aws-sdk/client-s3'

const supabase = getSupabaseClient()

type RoleApplicationInsert =
  Database['public']['Tables']['RoleApplications']['Insert']

type SendResumeParams = {
  fileName: string
  fileBuffer: string
  contentType: string
}

export const sendResumeToR2 = async ({
  fileName,
  fileBuffer,
  contentType,
}: SendResumeParams): Promise<void> => {
  const buffer = Buffer.from(fileBuffer, 'base64')

  await R2.send(
    new PutObjectCommand({
      Bucket: 'resumes-trampar-de-casa',
      Key: fileName,
      Body: buffer,
      ContentType: contentType,
    })
  )
}

async function checkExistingApplication(roleId: string, subscriberId: string) {
  const { data, error } = await supabase
    .from('RoleApplications')
    .select()
    .eq('roleId', roleId)
    .eq('subscriberId', subscriberId)
    .single()

  if (error && error.code !== 'PGRST116') {
    throw error
  }

  return !!data
}

export async function createRoleApplication(
  applicationData: RoleApplicationInsert
) {
  const hasExistingApplication = await checkExistingApplication(
    applicationData.roleId,
    applicationData.subscriberId
  )

  if (hasExistingApplication) {
    throw new Error('Você já se candidatou para esta vaga')
  }

  const { data, error } = await supabase
    .from('RoleApplications')
    .insert(applicationData)
    .select()
    .single()

  if (error) throw error

  return data
}

export async function getUserAndRoleData(roleId, subsciberId) {
  const { data: role } = await supabase
    .from('Roles')
    .select('*')
    .eq('id', roleId)
    .single()

  const { data: subscriber } = await supabase
    .from('Subscribers')
    .select('*')
    .eq('id', subsciberId)
    .single()

  return { role, subscriber }
}
