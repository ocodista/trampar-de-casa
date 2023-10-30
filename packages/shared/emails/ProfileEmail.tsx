import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from '@react-email/components'
import * as React from 'react'
interface ProfileEmailTemplateProps {
  profileUrl?: string
}

const GIF_URL = 'https://trampardecasa.com.br/images/form.gif'
const LOGO_URL = 'https://trampardecasa.com.br/images/logo.png'
const EMAIL_PREVIEW = 'A funcionalidade mais pedida chegou!'

export const ProfileEmailTemplate = ({
  profileUrl,
}: ProfileEmailTemplateProps) => (
  <Tailwind>
    <Html>
      <Head />
      <Preview>{EMAIL_PREVIEW}</Preview>
      <Body style={main}>
        <Container style={container} className="w-full max-w-full">
          <Img
            src={LOGO_URL}
            height={70}
            width={100}
            alt="Logo da Trampar De Casa"
          />
          <Text style={paragraph}>Olá, defensor do trabalho remoto!</Text>
          <Text style={paragraph}>
            Receber vagas é legal, mas que tal receber vagas personalizadas?
          </Text>
          <Link href={'$PROFILE_URL'}>
            <Img src={GIF_URL} alt="Trampar de casa" width="200" />
          </Link>
          <Text style={paragraph}>
            Agora você pode cadastrar suas preferências e receber vagas que
            fazem mais sentido para você 😁.
          </Text>

          <Section>
            <Button
              pX={12}
              pY={12}
              style={button}
              className="bg-slate-900"
              href={'$PROFILE_URL'}
            >
              Configurar preferências <span className="ml-2">⚙️</span>
            </Button>
          </Section>

          <Text style={paragraph}>
            Caso não encontremos nenhuma vaga para você, você receberá as 30
            melhores da semana.
          </Text>

          <Text style={paragraph}>
            Grande abraço,
            <br />
            Caio
          </Text>
        </Container>
      </Body>
    </Html>
  </Tailwind>
)

export default ProfileEmailTemplate

const main = {
  backgroundColor: '#ffffff',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
}

const container = {
  padding: '20px 0 48px',
}

const paragraph = {
  fontSize: '16px',
  lineHeight: '26px',
}

const button = {
  backgroundColor: '#020617',
  borderRadius: '3px',
  color: '#fff',
  fontSize: '16px',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'block',
}
