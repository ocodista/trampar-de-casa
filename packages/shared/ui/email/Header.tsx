import {
  Button,
  Column,
  Heading,
  Hr,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Tailwind,
  Text,
} from '@react-email/components'
import React from 'react'

export enum HeaderHtmlKeys {
  rolesCount = '##ROLES_COUNT',
  testimonialLink = '##GET_JOB_TESTIMONIAL',
}

export const HEADER_TITLE_SUFFIX = 'vagas para você Trampar de Casa 🔥'

export function Header({
  rolesCount,
  testimonialLink,
}: {
  rolesCount: string
  testimonialLink: string
}) {
  const previewText = `${rolesCount} ${HEADER_TITLE_SUFFIX}`
  const h1 = 'text-[24px]'
  const hr = {
    borderColor: '#e6ebf1',
    margin: '20px 0',
  }
  const paragraph = 'text-[#525f7f] text-[16px] leading-[24px] text-left'
  return (
    <Tailwind>
      <Preview>{previewText}</Preview>
      <Section className="flex items-center justify-between">
        <Row style={{ width: '37.5em' }}>
          <Column align="left">
            <Img
              src="https://trampardecasa.com.br/images/logo.png"
              height={70}
              width={100}
              alt="Logo da Trampar De Casa"
            />
          </Column>
          <Column align="right">
            <Button
              className="rounded-full bg-stone-900 px-4 pt-[8px] text-lg text-white"
              href={testimonialLink}
            >
              <Row className="space-x-5">
                <Column>Consegui uma vaga! </Column>
                <Column>
                  <Img
                    data-emoji="🎉"
                    style={{ width: 18, height: 18, paddingLeft: 8 }}
                    className="an1"
                    alt="🎉"
                    aria-label="🎉"
                    src="https://fonts.gstatic.com/s/e/notoemoji/15.0/1f389/32.png"
                    loading="lazy"
                  />
                </Column>
              </Row>
            </Button>
          </Column>
        </Row>
      </Section>
      <Heading
        className={h1}
      >{`🔥 ${rolesCount} vagas para você Trampar de Casa`}</Heading>
      <Hr style={hr} />
      <Text className={paragraph}>Salve, amantes do trabalho remoto!</Text>
      <Text className={paragraph}>
        Quer receber em dólar mas não sabe como? A{' '}
        <Link href="https://www.husky.io/?ref=trampardecasa">Husky</Link> pode
        te ajudar!
      </Text>
      <Link href="https://www.husky.io/?ref=trampardecasa">
        <Img
          width={300}
          style={{ paddingTop: 20, paddingBottom: 20 }}
          alt="Husky by Nomad"
          src="https://trampardecasa.com.br/images/companies/husky-with-bg.webp"
        />
      </Link>
      <Text className={paragraph}>
        Diga adeus à burocracia e receba seus pagamentos no Brasil de forma
        fácil e rápida.
      </Text>
      <Text className={paragraph}>
        Registre-se agora para receber de forma mais inteligente, rápida e
        transparente!
      </Text>
      <Text className={paragraph}>
        Agora, sem mais delongas, aqui estão suas vagas desta semana 😁
      </Text>
    </Tailwind>
  )
}
