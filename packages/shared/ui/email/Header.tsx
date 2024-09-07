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
  const previewText = 'Trampar de Casa é bom, mas...'
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
      <Text className={paragraph}>
        O melhor <strong>networking</strong> é o presencial!
      </Text>
      <Text className={paragraph}>
        Que tal participar de um dos melhores eventos de programação do Brasil?
      </Text>
      <Link href="https://fastix.com.br/events/front-in-sampa?coupon=TRAMPARDCASA">
        <Img
          width={500}
          height={250}
          src="https://fastix.com.br/_next/image?url=%2Fevents%2Ffront-in-sampa%2Fimage%2Flandscape%3Ft%3D1725461071001&w=3840&q=75"
        />
      </Link>
      <Text className={paragraph}>
        A FrontInSampa apoia o trabalho 100% remoto, e em parceria com o Trampar
        de Casa, oferece um <strong>desconto exclusivo de 15%</strong> para
        todos os inscritos que utilizarem o cupom <strong>TRAMPARDCASA</strong>.
      </Text>
      <Text className={paragraph}>
        <Link href="https://fastix.com.br/events/front-in-sampa?coupon=TRAMPARDCASA">
          Clique aqui{' '}
        </Link>{' '}
        para garantir o seu ingresso!
      </Text>
      <Text className={paragraph}>
        Agora, aqui vão suas vagas desta semana, valeu!
      </Text>
    </Tailwind>
  )
}
