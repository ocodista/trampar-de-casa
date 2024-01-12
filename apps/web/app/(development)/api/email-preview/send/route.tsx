import { render } from '@react-email/render'
import { getFakeRoles } from 'app/(development)/email-preview/getFakeRoles'
import { Resend } from 'resend'
import { EmailWrapper } from 'shared/ui/email/EmailWrapper'
import { Footer } from 'shared/ui/email/Footer'
import { Header } from 'shared/ui/email/Header'
import { RoleCard } from 'shared/ui/email/RoleCard'

const fakeRoles = Array.from({ length: 5 }).map(getFakeRoles)
export const POST = async (req: Request) => {
  const url = new URL(req.url)
  const email = url.searchParams.get('email')
  if (!email) return new Response(null, { status: 400 })

  const resendKey = process.env['RESEND_KEY']
  const resend = new Resend(resendKey)

  await resend.emails.send({
    from: 'Trampar de Casa <teste@trampardecasa.com.br>',
    to: email,
    subject: 'Teste - Email de vagas',
    html: render(
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
    ),
  })

  return new Response('Email enviado!')
}
