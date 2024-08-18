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
  /**
   * Quer maximizar seus ganhos internacionais?
🚀 A Husky é a solução ideal para você:

Taxas Imbatíveis: Economize em cada transferência!
Primeiro Pagamento GRÁTIS: Sem taxa alguma na sua primeira transação!
Bônus Exclusivo: 3 cupons de 50% OFF em transferências futuras!

Como usuário fiel há anos, garanto: a Husky simplifica sua vida financeira!
Pronto para otimizar suas finanças? Abra sua conta aqui e comece a economizar agora!
Trampar de Casa 🤝 Husky: Seu dinheiro, sem fronteiras!

        // <Link href="https://www.husky.io/global-worker-2024/?ref=nzg5ndz">
        //   aqui.
        // </Link>
   * 
   */
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

      <Text className={paragraph}>Salve, guerreiro(a) do trabalho remoto!</Text>
      <Text className={paragraph}>
        Quer maximizar seus ganhos internacionais? A Husky é a solução ideal
        para você 🚀
      </Text>
      <Text className={paragraph}>
        Exclusivo para vocês leitores: <b>Primeiro pagamento TAXA 0</b> +{' '}
        <b>3 cupons de 50% de desconto</b> em transferências futuras!
      </Text>
      <Text className={paragraph}>
        Criando sua conta através{' '}
        <Link href="https://husky.io?ref=nzg5ndz">deste link patrocinado</Link>{' '}
        você ajuda nosso projeto a se manter funcionando!
      </Text>
      <Text className={paragraph}>
        Trampar de Casa 🤝 Husky: Seu dinheiro, sem fronteiras!
      </Text>
      <Link href="https://husky.io?ref=nzg5ndz" target="_blank">
        <Img
          src="https://i.imgur.com/OiTECSl.png"
          alt="Logo da Husky"
          className="ml-auto mr-auto aspect-video min-w-[128px] cursor-pointer object-contain"
          width={228}
          height={28}
        />
      </Link>
      <Text className={paragraph}>Agora, aproveite as vagas desta semana!</Text>
    </Tailwind>
  )
}
