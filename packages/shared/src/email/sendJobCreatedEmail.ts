import { render } from '@react-email/render'
import fs from 'fs'
import path from 'path'
import React from 'react'
import { Resend } from 'resend'
import JobCreatedEmailTemplate from 'shared/emails/jobCreatedEmailTemplate'
import { Database } from 'db'

type Role = Database['public']['Tables']['Roles']['Row']

const TEMPLATE_EMAIL = render(React.createElement(JobCreatedEmailTemplate))
const EMAIL_SUBJECT = '🎉 Sua vaga foi criada com sucesso!' as const
const resend = new Resend(process.env['RESEND_KEY'])

export const sendJobCreatedEmail = async ({
  email,
  id,
  title,
}: Pick<Role, 'id' | 'title'> & { email: string }) => {
  try {
    const jobLink = `https://trampardecasa.com.br/vaga/${id}`
    await resend.emails.send({
      from: 'Trampar de Casa <vagas@trampardecasa.com.br>',
      to: email,
      html: TEMPLATE_EMAIL.replaceAll('$JOB_LINK', jobLink)
        .replaceAll('$JOB_ID', id)
        .replaceAll('$JOB_TITLE', title),
      subject: EMAIL_SUBJECT,
    })
  } catch (error) {
    console.error('Erro ao enviar e-mail:', error)
    fs.appendFileSync(
      path.resolve(__dirname, `./failed-job-created-emails.txt`),
      `${id},${email},${title}\n`
    )
  }
}
