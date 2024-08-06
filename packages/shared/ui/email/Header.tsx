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
  const previewText = 'Pesquisa Global sobre Trabalho Remoto e Ofertas'
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
      {/*
Salve, amante do trabalho remoto! Tudo bem?

Você sabia que 81% dos trabalhadores globais estão satisfeitos com seus salários e que a média salarial ultrapassa os R$25 mil? Graças à Husky, temos acesso a esses e outros dados super interessantes sobre o mercado de trabalho internacional! Para conferir a pesquisa completa, clique [aqui].

A Husky é parceira do Trampar de Casa e facilita sua vida na hora de receber transferências internacionais. Eu mesmo sou cliente fiel há anos!

Para receber seu primeiro pagamento com TAXA ZERO e mais 3 cupons de 50% OFF, abra sua conta aqui: 
      */}
      <Text className={paragraph}>
        Salve, amante do trabalho remoto! Tudo bem?
      </Text>
      <Text className={paragraph}>
        Você sabia que 81% dos trabalhadores globais estão satisfeitos com seus
        salários e que a média salarial ultrapassa os R$25 mil? Graças à Husky,
        temos acesso a esses e outros dados super interessantes sobre o mercado
        de trabalho internacional! Para conferir a pesquisa completa, clique{' '}
        <Link href="https://www.husky.io/global-worker-2024/?ref=nzg5ndz">
          aqui.
        </Link>
      </Text>
      <Text className={paragraph}>
        A Husky é parceira do Trampar de Casa e facilita sua vida na hora de
        receber transferências internacionais. Eu mesmo sou cliente fiel há
        anos!
      </Text>
      <Text className={paragraph}>
        Para receber seu primeiro pagamento com TAXA ZERO e mais 3 cupons de 50%
        OFF, abra sua conta{' '}
        <Link href="https://husky.io?ref=nzg5ndz">aqui: </Link>{' '}
      </Text>
      <Text className={paragraph}>Agora, aproveite as vagas desta semana!</Text>
    </Tailwind>
  )
}
