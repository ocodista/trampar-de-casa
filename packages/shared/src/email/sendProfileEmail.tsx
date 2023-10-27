import { render } from '@react-email/render'
import { SupabaseTable } from 'db/src/supabase/utilityTypes'
import React from 'react'
import { Resend } from 'resend'
import ProfileEmailTemplate from '../../emails/ProfileEmail'
import { encrypt } from '../security'

type Subscriber = SupabaseTable<'Subscribers'>
const TEMPLATE_EMAIL = render(<ProfileEmailTemplate />)

const profileUrl = (encryptedId: string) =>
  `https://trampardecasa.com.br/subscribers/profile/${encryptedId}`
export const sendProfileEmail = async ({
  email,
  id,
}: Pick<Subscriber, 'email' | 'id'>) => {
  console.time(`sendProfileEmail#${email}`)
  const cryptSecret = process.env['CRYPT_SECRET']
  if (!cryptSecret) throw new Error('secret not found')

  const resend = new Resend(process.env['RESEND_KEY'])
  const encryptedId = encrypt(cryptSecret, id)

  await resend.emails.send({
    from: 'Trampar de Casa <comece@trampardecasa.com.br>',
    to: email,
    html: TEMPLATE_EMAIL.replaceAll('$PROFILE_URL', profileUrl(encryptedId)),
    subject: 'Personalize Suas Oportunidades de Trabalho Remoto Agora!',
  })
  console.timeEnd(`sendProfileEmail#${email}`)
}
