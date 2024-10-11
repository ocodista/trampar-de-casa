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
