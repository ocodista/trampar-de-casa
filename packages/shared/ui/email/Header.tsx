import {
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
  // const previewText = `${rolesCount} ${HEADER_TITLE_SUFFIX}`
  const previewText = `Receba seu salário internacional com a Husky!`
  const h1 = 'text-[24px] mt-4'
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
              className="inline-flex h-auto items-center justify-center rounded-full bg-black px-4 py-3 text-sm font-medium text-white no-underline"
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
      <Heading className={h1}>{previewText}</Heading>
      <Hr style={hr} />

      <Text className={paragraph}>Fala, amante do trabalho remoto!</Text>
      <Text className={paragraph}>
        Quer otimizar seus rendimentos internacionais? A Husky é a ferramenta
        perfeita para você 💼
      </Text>
      <Text className={paragraph}>
        Oferta especial para nossos leitores: <b>Primeira transação SEM TAXA</b>{' '}
        + <b>3 vouchers de 50% off</b> em futuras transferências!
      </Text>
      <Text className={paragraph}>
        Ao criar sua conta através{' '}
        <Link href="https://husky.io?ref=nzg5ndz">deste link especial</Link>{' '}
        você contribui com o nosso projeto!
      </Text>
      <Text className={paragraph}>
        Trabalhar de Casa 🤝 Husky: Seu dinheiro, sem limites!
      </Text>
      <Link href="https://husky.io?ref=nzg5ndz" target="_blank">
        <Img
          src="https://i.imgur.com/OiTECSl.png"
          alt="Logotipo da Husky"
          className="ml-auto mr-auto aspect-video min-w-[128px] cursor-pointer object-contain"
          width={228}
          height={28}
        />
      </Link>
      <Text className={paragraph}>
        Agora, confira as oportunidades desta semana!
      </Text>
    </Tailwind>
  )
}
