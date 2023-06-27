import { Resend } from 'resend';
import { confirmationEmailHTML } from './htmlTemplate';
import { CreateEmailResponse } from 'resend/build/src/emails/interfaces';

interface SendConfirmationEmail {
  secretKey: string,
  resendKey: string,
  to: string,
  subscriberId: string
}

export const sendConfirmationEmail = async ({ secretKey, to, resendKey, subscriberId }: SendConfirmationEmail): Promise<CreateEmailResponse | null> => {
  const resend = new Resend(resendKey)
  const emailHTML = confirmationEmailHTML({ subscriberId, secretKey })
  const response = await resend.emails.send({
    from: 'comece@trampardecasa.com.br (Trampar de Casa)',
    to,
    subject: '🚀 Ative sua Conta - Confirmação de Email Necessária',
    html: emailHTML
  })
  return response
}