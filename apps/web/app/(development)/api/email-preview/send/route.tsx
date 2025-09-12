import { render } from '@react-email/render'
import { getFakeRoles } from 'app/(development)/email-preview/getFakeRoles'
import { SESClient, SendRawEmailCommand } from '@aws-sdk/client-ses'
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

  const sesClient = new SESClient({
    region: process.env.AWS_REGION || 'us-east-1',
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
  })

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
    console.log(
      `📧 [${new Date().toISOString()}] Sending test email via AWS SES`
    )
    console.log(`   To: ${email}`)
    console.log(`   Subscriber ID: ${subscriberId}`)
    console.log(`   Unsubscribe URL: ${unsubscribeUrl}`)

    // Build raw email with proper headers
    const rawEmail = [
      `From: ${EMAIL_FROM}`,
      `To: ${email}`,
      `Subject: Teste - Email de vagas`,
      `MIME-Version: 1.0`,
      `Content-Type: text/html; charset=UTF-8`,
      `List-Unsubscribe: <${unsubscribeUrl}>`,
      `List-Unsubscribe-Post: List-Unsubscribe=One-Click`,
      ``,
      html,
    ].join('\r\n')

    const sendEmailCommand = new SendRawEmailCommand({
      RawMessage: {
        Data: Buffer.from(rawEmail),
      },
      Tags: [
        {
          Name: 'EmailType',
          Value: 'test-preview',
        },
        {
          Name: 'Environment',
          Value: 'development',
        },
      ],
    })

    const result = await sesClient.send(sendEmailCommand)

    // Log successful send
    console.log(
      `✅ [${new Date().toISOString()}] Email sent successfully via AWS SES`
    )
    console.log(`   Message ID: ${result.MessageId || 'N/A'}`)
    console.log(`   Tags included: List-Unsubscribe, EmailType`)

    return new Response(
      JSON.stringify({
        message: 'Email enviado via AWS SES!',
        unsubscribeUrl,
        subscriberId,
        messageId: result.MessageId || null,
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
