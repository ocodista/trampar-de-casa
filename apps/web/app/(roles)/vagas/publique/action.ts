'use server'

import { Database, getSupabaseClient } from 'db'
import { sendJobCreatedEmail } from 'shared/src/email/sendJobCreatedEmail'

type Role = Database['public']['Tables']['Roles']['Insert']

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
