'use server'

import { toast } from 'app/hooks/use-toast'
import { getSupabaseClient } from 'db'
import { cookies } from 'next/headers'
import { Entities } from 'shared/src/enums'
import { encrypt } from 'shared/src/security'
import { createClient } from './supabase/serve'
//TODO: Tratar erro de email não cadastrado
export async function signInWithEmail(email) {
  const secretKey = process.env['CRYPT_SECRET'] || ''
  const cookieStore = cookies()
  const supabaseClient = createClient(cookieStore)
  const supabaseDB = getSupabaseClient()
  const { data: dbData } = await supabaseDB
    .from(Entities.Subcribers)
    .select('id')
    .eq('email', email)
  const subscriberId = dbData[0]?.id
  const encryptedId = encrypt(secretKey, subscriberId)
  const { error } = await supabaseClient.auth.signInWithOtp({
    email: email,
    options: {
      shouldCreateUser: false,
      emailRedirectTo: `http://localhost:3000/subscribers/profile/${encryptedId}`,
    },
  })

  if (error) {
    toast({
      title: 'Erro ao validar o e-mail',
      variant: 'destructive',
      description: error.message,
    })
    return
  }
}
