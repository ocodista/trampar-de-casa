import { render } from '@react-email/render'
import { SupabaseTable } from 'db/src/supabase/utilityTypes'
import fs from 'fs'
import path from 'path'
import React from 'react'
import { Resend } from 'resend'
import ProfileEmailTemplate from '../../emails/ProfileEmail'
import { createProfileFormLink } from '../services/createProfileFormLink'

type Subscriber = SupabaseTable<'Subscribers'>
const TEMPLATE_EMAIL = render(<ProfileEmailTemplate />)
const EMAIL_SUBJECT = '⚙️ Configure suas preferências de vagas!' as const
const resend = new Resend(process.env['RESEND_KEY'])

export const sendProfileEmail = async ({
  email,
  id,
}: Pick<Subscriber, 'email' | 'id'>) => {
  try {
    await resend.emails.send({
      from: 'Trampar de Casa <comece@trampardecasa.com.br>',
      to: email,
      html: TEMPLATE_EMAIL.replaceAll(
        '$PROFILE_URL',
        createProfileFormLink(id)
      ),
      subject: EMAIL_SUBJECT,
    })
  } catch {
    fs.appendFileSync(
      path.resolve(__dirname, `./failed-preference-emails.txt`),
      `${id},${email}\n`
    )
  }
}
