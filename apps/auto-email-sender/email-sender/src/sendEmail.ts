import { Resend } from 'resend'

const logSuccessfully = (email: string) => {
  console.log(`Successfully sent to ${email}!`)
}

const logFailure = (email: string, error: unknown) => {
  console.error(`Error sending to: ${email}`, error)
}

export const sendEmail = async (
  emails: Resend['emails'],
  email: string,
  html: string
) => {
  try {
    await emails.send({
      from: 'Trampar de Casa <comece@trampardecasa.com.br>',
      to: email,
      subject: 'Vagas para você Trampar de Casa',
      html,
    })
    logSuccessfully(email)
  } catch (error) {
    logFailure(email, error)
    throw error
  }
}
