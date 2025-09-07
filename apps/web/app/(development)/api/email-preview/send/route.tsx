import { render } from '@react-email/render'
import { getFakeRoles } from 'app/(development)/email-preview/getFakeRoles'
import { Resend } from 'resend'
import { EmailWrapper } from 'shared/ui/email/EmailWrapper'
import { Footer } from 'shared/ui/email/Footer'
import { Header } from 'shared/ui/email/Header'
import { RoleCard } from 'shared/ui/email/RoleCard'
import { UiRoutes, encrypt } from 'shared'

const EMAIL_FROM = 'Trampar de Casa <comece@trampardecasa.com.br>'

function getUnsubscribeLink(url: string, id: string) {
  const secretKey = process.env['CRYPT_SECRET'] || ''
  if (!secretKey) throw new Error('CRYPT_SECRET env is not settled')
  const encryptedId = encrypt(secretKey, id)

  return `${url}${UiRoutes.OptOut}/${encryptedId}`
}

const fakeRoles = Array.from({ length: 5 }).map(getFakeRoles)

export const POST = async (req: Request) => {
  const url = new URL(req.url)
  const email = url.searchParams.get('email')
  const subscriberId =
    url.searchParams.get('subscriberId') || 'test-subscriber-123'

  if (!email) return new Response(null, { status: 400 })

  const resendKey = process.env['RESEND_KEY']
  const resend = new Resend(resendKey)

  // Generate unsubscribe link using the same logic as auto-email-sender
  const urlPrefix =
    process.env['URL_PREFIX'] ||
    process.env['NEXT_PUBLIC_URL'] ||
    'https://trampardecasa.com.br'
  const unsubscribeUrl = getUnsubscribeLink(urlPrefix, subscriberId)

  const html = render(
    <EmailWrapper>
      <Header rolesCount="10" testimonialLink="teste" />
      {fakeRoles.map((props) => (
        <RoleCard
          key={props.id}
          skills={props.skillNames}
          location={props.country}
          {...props}
        />
      ))}
      <Footer href="teste" />
    </EmailWrapper>
  )

  try {
    // Log email send attempt
    console.log(`📧 [${new Date().toISOString()}] Sending test email`)
    console.log(`   To: ${email}`)
    console.log(`   Subscriber ID: ${subscriberId}`)
    console.log(`   Unsubscribe URL: ${unsubscribeUrl}`)

    const result = await resend.emails.send({
      from: EMAIL_FROM,
      to: email,
      subject: 'Teste - Email de vagas',
      html: html,
      headers: {
        'List-Unsubscribe': `<${unsubscribeUrl}>`,
        'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click',
      },
    })

    // Log successful send
    console.log(`✅ [${new Date().toISOString()}] Email sent successfully`)
    console.log(`   Resend ID: ${result?.data?.id || 'N/A'}`)
    console.log(`   Headers included: List-Unsubscribe, List-Unsubscribe-Post`)

    return new Response(
      JSON.stringify({
        message: 'Email enviado!',
        unsubscribeUrl,
        subscriberId,
        resendId: result?.data?.id || null,
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    )
  } catch (error) {
    console.error('Error sending email:', error)
    return new Response(JSON.stringify({ error: 'Failed to send email' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
