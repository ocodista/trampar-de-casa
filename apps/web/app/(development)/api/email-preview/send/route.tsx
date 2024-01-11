import { Body, Head, Html, Tailwind } from '@react-email/components'
import { render } from '@react-email/render'
import { getFakeRoles } from 'app/(development)/email-preview/getFakeRoles'
import { Resend } from 'resend'
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
      <Tailwind>
        <Html>
          <Head />
          <Body
            className="bg-[#f6f9fc]"
            style={{
              fontFamily:
                '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
            }}
          >
            <div className="mx-auto my-0 mb-[64px] max-w-[37.5em] bg-white p-[20px_48px_48px]">
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
            </div>
          </Body>
        </Html>
      </Tailwind>
    ),
  })

  return new Response('Email enviado!')
}
