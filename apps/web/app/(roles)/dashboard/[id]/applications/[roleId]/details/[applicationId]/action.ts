'use server'

import { GetObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { R2 } from 'shared'

import { getSupabaseClient } from 'db'

export type ApplicationStatus = 'pending' | 'approved' | 'rejected' | 'ignored'

export async function getResumePresignedUrl(fileName: string) {
  const command = new GetObjectCommand({
    Bucket: 'resumes-trampar-de-casa',
    Key: fileName,
  })

  return getSignedUrl(R2, command, { expiresIn: 3600 })
}

export async function updateStatus(
  applicationId: string,
  newStatus: ApplicationStatus
) {
  try {
    const supabase = getSupabaseClient()

    const validStatuses: ApplicationStatus[] = [
      'pending',
      'approved',
      'rejected',
      'ignored',
    ]
    if (!validStatuses.includes(newStatus)) {
      throw new Error('Status inválido')
    }

    const { data, error } = await supabase
      .from('RoleApplications')
      .update({ status: newStatus })
      .eq('id', applicationId)
      .select()
      .single()

    if (error) {
      throw error
    }

    return {
      success: true,
      data,
    }
  } catch (error) {
    console.error('Erro ao atualizar status:', error)
    return {
      success: false,
      error: error.message,
    }
  }
}
