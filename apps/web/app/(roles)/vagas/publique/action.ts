'use server'

import { PutObjectCommand } from '@aws-sdk/client-s3'
import { Database, getSupabaseClient } from 'db'
import { R2 } from 'shared'
import { sendJobCreatedEmail } from 'shared/src/email/sendJobCreatedEmail'

type Role = Database['public']['Tables']['Roles']['Insert']

interface SendCompanyLogoParams {
  fileName: string
  fileBuffer: string
  contentType: string
}

const supabase = getSupabaseClient()

export const createRole = async (roleData: Role, email: string) => {
  const { data, error } = await supabase
    .from('Roles')
    .insert(roleData)
    .select()
    .single()

  if (error) throw error

  if (data) {
    try {
      await sendJobCreatedEmail({
        email,
        id: data.id,
        title: data.title,
      })
    } catch (emailError) {
      console.error('Erro ao enviar e-mail:', emailError)
    }
  }

  return data
}

export const createRoleOwner = async (roleID: string, subscriberID: string) => {
  const { error } = await supabase.from('RoleOwner').insert({
    roleID,
    subscriberID,
  })

  if (error) throw error
}

export const checkUserHasRoles = async (email: string) => {
  const supabase = getSupabaseClient()

  const { data: userData, error: userError } = await supabase
    .from('Subscribers')
    .select('id')
    .eq('email', email)
    .single()

  if (userError || !userData) return false

  const { data: roleData, error: roleError } = await supabase
    .from('RoleOwner')
    .select('roleID')
    .eq('subscriberID', userData.id)
    .limit(1)

  if (roleError) return false

  return roleData && roleData.length > 0
}

export const sendCompanyLogoToR2 = async ({
  fileName,
  fileBuffer,
  contentType,
}: SendCompanyLogoParams): Promise<void> => {
  const buffer = Buffer.from(fileBuffer, 'base64')

  await R2.send(
    new PutObjectCommand({
      Bucket: 'company-logo-trampar-de-casa',
      Key: fileName,
      Body: buffer,
      ContentType: contentType,
    })
  )
}
