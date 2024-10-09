'use server'

import { getSupabaseClient } from 'db'
import { encrypt } from 'shared'
import { sendProfileEmail } from 'shared/src/email/sendProfileEmail'

export async function encryptId(id: string) {
  const secretKey = process.env['CRYPT_SECRET'] || ''

  return encrypt(secretKey, id)
}

export async function sendEditPreferencesEmail(email: string, id: string) {
  try {
    await sendProfileEmail({ email, id })
  } catch (error) {
    console.error('Erro ao enviar e-mail de preferências:', error)
    throw error
  }
}

export default async function login(email: string) {
  try {
    const supabase = getSupabaseClient()
    const { data, error } = await supabase
      .from('Subscribers')
      .select('*')
      .eq('email', email)
      .single()

    if (error && error.code === 'PGRST116') {
      console.error('Usuário não encontrado com o e-mail:', email)
      throw new Error('Usuário não encontrado')
    } else if (error) {
      console.error('Erro ao buscar usuário:', error)
      throw error
    }

    console.log('Usuário encontrado com sucesso:')
    return data.id
  } catch (error) {
    console.error('Erro ao buscar usuário:', error)
    throw error
  }
}
