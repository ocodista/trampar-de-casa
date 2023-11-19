import { Resend } from 'resend'
import { confirmationEmailHTML } from './htmlTemplate'

interface SendConfirmationEmail {
  secretKey: string
  resendKey: string
  to: string
  subscriberId: string
}

export const sendConfirmationEmail = async ({
  secretKey,
  to,
  resendKey,
  subscriberId,
}: SendConfirmationEmail): Promise<void> => {
  if (!resendKey) {
    console.warn('RESEND_KEY is empty!')
    return
  }
  const resend = new Resend(resendKey)
  const emailHTML = confirmationEmailHTML({ subscriberId, secretKey })
  await resend.emails.send({
    from: 'Trampar de Casa <comece@trampardecasa.com.br>',
    to,
    subject: '🚀 Ative sua Conta - Confirmação de Email Necessária',
    html: emailHTML,
  })
}
