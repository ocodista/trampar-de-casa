import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Img,
  Preview,
  Section,
  Tailwind,
  Text,
  render,
} from '@react-email/components'
import fs from 'node:fs'
import * as React from 'react'

interface KoalaWelcomeEmailProps {
  profileUrl: string
}

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : ''

export const KoalaWelcomeEmail = ({ profileUrl }: KoalaWelcomeEmailProps) => (
  <Tailwind>
    <Html>
      <Head />
      <Preview>
        The sales intelligence platform that helps you uncover qualified leads.
      </Preview>
      <Body style={main}>
        <Container style={container}>
          <Img
            src={'https://www.trampardecasa.com.br/images/logo.svg'}
            width="170"
            height="50"
            alt="Trampar de casa"
            style={logo}
          />
          <Text style={paragraph}>Olá, defensor do trabalho remoto!</Text>
          <Text style={paragraph}>
            Receber vagas é legal, mas que tal receber vagas personalizadas?
          </Text>

          <Img
            src={'http://localhost:3000/images/form.gif'}
            alt="Trampar de casa"
            width="300"
            style={logo}
          />

          <Text style={paragraph}>
            Agora você pode cadastrar suas preferências e receber vagas mais
            direcionadas.
          </Text>

          <Section style={btnContainer}>
            <Button
              pX={12}
              pY={12}
              style={button}
              className="bg-slate-900"
              href={profileUrl}
            >
              Clique aqui para melhorar sua experiência com o Trampar De Casa.
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

export default KoalaWelcomeEmail

const main = {
  backgroundColor: '#ffffff',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
}

const container = {
  margin: '0 auto',
  padding: '20px 0 48px',
}

const logo = {
  margin: '0 auto',
}

const paragraph = {
  fontSize: '16px',
  lineHeight: '26px',
}

const btnContainer = {
  textAlign: 'center' as const,
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

const hr = {
  borderColor: '#cccccc',
  margin: '20px 0',
}

const footer = {
  color: '#8898aa',
  fontSize: '12px',
}

fs.writeFileSync(
  './test.html',
  render(<KoalaWelcomeEmail profileUrl={'aaa'} />)
)
