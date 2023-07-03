import {
  Tailwind,
  Html,
  Head,
  Preview,
  Body,
  Container,
  Section,
  Heading,
  Hr,
  Link,
  Text,
} from '@react-email/components'
import { render } from '@react-email/render'
import React from 'react'
import { globalRoles, localRoles } from './roles'
import RoleList from './RoleList'

export const OpeningEmail = () => {
  const rolesCount = globalRoles.length + localRoles.length
  const previewText = `${rolesCount} vagas para você Trampar de Casa 🔥`
  return (
    <Tailwind>
      <Html>
        <Head />
        <Preview>{previewText}</Preview>
        <Body style={main}>
          <Container style={container}>
            <Section style={box}>
              <Heading style={h1}>{previewText}</Heading>
              <Hr style={hr} />
              <Text style={paragraph}>
                Bem-vindo(a) à nossa comunidade de trabalho remoto!
              </Text>
              <Text style={paragraph}>
                Vamos começar com uma lista bem variada de vagas.
              </Text>
              <Text style={paragraph}>
                Em breve, as oportunidades serão personalizadas para você, de
                acordo com suas preferências.
              </Text>
              <Text style={paragraph}>
                Adoraríamos ouvir sua opinião. Clique{' '}
                <Link style={anchor} href="https://forms.gle/eeaMhgm3LtftmTKZ8">
                  aqui
                </Link>{' '}
                para deixar seu feedback.
              </Text>
              <Text style={paragraph}>
                Sem mais delongas, vamos às vagas, espero que goste!
              </Text>
              <Hr style={hr} />
              <Heading style={h1}>
                🌎 {globalRoles.length} Vagas internacionais
              </Heading>
              <RoleList roles={globalRoles} />
              <Heading style={h1}>
                🇧🇷 {localRoles.length} Vagas nacionais
              </Heading>
              <RoleList roles={localRoles} />
              <Hr style={hr} />
              <Text style={paragraph}>
                Muito obrigado pela sua atenção e tempo!
              </Text>
              <Text style={paragraph}>Até a próxima!</Text>
            </Section>
          </Container>
        </Body>
      </Html>
    </Tailwind>
  )
}

const main = {
  backgroundColor: '#f6f9fc',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
}

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px',
}

const box = {
  padding: '0 48px',
}

const hr = {
  borderColor: '#e6ebf1',
  margin: '20px 0',
}

const paragraph = {
  color: '#525f7f',

  fontSize: '16px',
  lineHeight: '24px',
  textAlign: 'left' as const,
}

const h1 = {
  fontSize: '24px',
}

const anchor = {
  color: '#556cd6',
}

export const openingEmailHTML = render(OpeningEmail())
