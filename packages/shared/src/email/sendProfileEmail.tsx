import { render } from '@react-email/render'
import { SESClient, SendRawEmailCommand } from '@aws-sdk/client-ses'
import { SupabaseTable } from 'db/src/supabase/utilityTypes'
import fs from 'fs'
import path from 'path'
import React from 'react'
import ProfileEmailTemplate from '../../emails/ProfileEmail'
import { createProfileFormLink } from '../services/createProfileFormLink'

type Subscriber = SupabaseTable<'Subscribers'>
const TEMPLATE_EMAIL = render(<ProfileEmailTemplate />)
const EMAIL_SUBJECT = '⚙️ Configure suas preferências de vagas!' as const

export const sendProfileEmail = async ({
  email,
  id,
}: Pick<Subscriber, 'email' | 'id'>) => {
  try {
    const sesClient = new SESClient({
      region: process.env.AWS_REGION || 'us-east-1',
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
      },
    })

    const from = 'Trampar de Casa <comece@trampardecasa.com.br>'
    const html = TEMPLATE_EMAIL.replaceAll(
      '$PROFILE_URL',
      createProfileFormLink(id)
    )

    const rawEmailParts = [
      `From: ${from}`,
      `To: ${email}`,
      `Subject: ${EMAIL_SUBJECT}`,
      `MIME-Version: 1.0`,
      `Content-Type: text/html; charset=UTF-8`,
      '',
      html,
    ]

    const rawEmail = rawEmailParts.join('\r\n')

    const sendEmailCommand = new SendRawEmailCommand({
      RawMessage: {
        Data: Buffer.from(rawEmail),
      },
      Tags: [
        {
          Name: 'EmailType',
          Value: 'profile-configuration',
        },
        {
          Name: 'Environment',
          Value: process.env.NODE_ENV || 'production',
        },
      ],
    })

    await sesClient.send(sendEmailCommand)
  } catch {
    fs.appendFileSync(
      path.resolve(__dirname, `./failed-preference-emails.txt`),
      `${id},${email}\n`
    )
  }
}
