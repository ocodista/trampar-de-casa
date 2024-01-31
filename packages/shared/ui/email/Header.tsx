import {
  Button,
  Column,
  Heading,
  Hr,
  Img,
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
            <a
              className="text-primary-foreground inline-flex h-10 h-auto items-center justify-center rounded-full bg-black px-4 py-3 text-sm font-medium text-white no-underline transition-colors"
              href={testimonialLink}
            >
              Consegui uma vaga!
              <Img
                data-emoji="🎉"
                style={{ width: 18, height: 18, paddingLeft: 8 }}
                className="an1"
                alt="🎉"
                aria-label="🎉"
                src="https://fonts.gstatic.com/s/e/notoemoji/15.0/1f389/32.png"
                loading="lazy"
              />
            </a>
          </Column>
        </Row>
      </Section>
      <Heading
        className={h1}
      >{`${rolesCount} vagas para você Trampar de Casa`}</Heading>
      <Hr style={hr} />
      <Text className={paragraph}>Bom dia!!!</Text>
      <Text className={paragraph}>
        Hoje, dia{' '}
        <i>
          3<span style={{ fontSize: '2px' }}>0</span>1
        </i>{' '}
        de Janeiro, temos um <strong>nova funcionalidade</strong> para anunciar!
      </Text>
      <Text className={paragraph}>
        Agora você pode nos ajudar a expandir o universo do trabalho remoto:{' '}
      </Text>
      <Button
        href="https://trampardecasa.com.br/vagas/publique"
        className="text-primary-foreground inline-flex h-10 h-auto items-center justify-center rounded-md bg-black px-4 py-3 text-sm font-medium text-white transition-colors"
      >
        Publique ou Indique vagas remotas!{' '}
      </Button>
      <Text className={paragraph}>
        Agora, aproveite as novas vagas desta semana!
      </Text>
    </Tailwind>
  )
}
