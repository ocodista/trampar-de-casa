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

export const HEADER_TITLE_SUFFIX = 'vagas 100% remotas para você 🏠'

export function Header({
  rolesCount,
  testimonialLink,
}: {
  rolesCount: string
  testimonialLink: string
}) {
  const previewText = `${rolesCount} ${HEADER_TITLE_SUFFIX}`
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
      <Text className={paragraph}>E aí, tudo bem?</Text>
      <Text className={paragraph}>
        O trabalho remoto é o <strong>novo normal</strong>. De acordo com{' '}
        <Link href="https://www.theguardian.com/money/article/2024/jul/12/working-from-home-data">
          este artigo
        </Link>{' '}
        do The Guardian, o número de trabalhadores em regime 100% remoto não
        diminuiu entre 2022 e 2023.
      </Text>
      <Text className={paragraph}>
        Infelizmente, existem algumas empresas querendo acabar com esta nova
        realidade (que proporciona maior equilíbrio entre vida pessoal e
        trabalho).
      </Text>
      <Text className={paragraph}>
        Para garantir a sobrevivência do <i>trabalho remoto</i>, é preciso
        <strong> resistir.</strong>
      </Text>
      <Text className={paragraph}>
        <Link href="https://www.forbes.com/sites/jackkelly/2024/09/27/employees-at-assassins-creed-maker-ubisoft-urged-to-strike-following-new-rto-policy-why-ceos-are-doubling-down/">
          Funcionários da Ubisoft anunciam 3 dias de greve contra nova medida de
          RTO (return-to-office/retorno ao escritório).
        </Link>
      </Text>
      <Text className={paragraph}>
        Todo apoio à galera da Ubisoft, que consigam reverter essa decisão
        retrógrada do CEO, ou que encontrem uma ótima nova vaga.
      </Text>
      <div className="flex">
        <Text className={`${paragraph} m-0 mr-2`}>
          Agora, aqui vai nosso ato de <strong>resistência</strong>
        </Text>
        💪
      </div>
      <Text className={paragraph}>
        <i>Aproveite suas vagas!</i>
      </Text>
    </Tailwind>
  )
}
