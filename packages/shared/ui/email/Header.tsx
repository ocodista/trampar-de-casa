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
      <Text className={paragraph}>Salve, beleza?</Text>
      <Text className={paragraph}>
        O trabalho remoto é o <strong>novo normal</strong>, e o Spotify tá
        mostrando como se faz!
      </Text>
      <Text className={paragraph}>
        Eles acabaram de reafirmar o compromisso com o trabalho remoto, dizendo
        que seus funcionários <Link href="https://www.techradar.com/pro/spotify-says-it-will-allow-staff-to-work-from-home-says-employees-arent-children">não são crianças</Link> 😁 
      </Text>
      <Text className={paragraph}>
      Nada melhor do que uma empresa que enxerga seus funcionários como adultos responsáveis 🙏
      </Text>
      <Text className={paragraph}>
        Mas e aí, já comprou seu ingresso do FrontInSampa? Já é sábado agora, agiliza!
      </Text>
      <Text className={paragraph}>
        15% off com o cupom{' '}
        <Link href="https://fastix.com.br/events/front-in-sampa?coupon=TRAMPARDCASA">
          TRAMPARDCASA
        </Link>
      </Text>
      <Text className={paragraph}>
        <i>
          Sem mais delongas, aqui estão suas vagas 100% remotas ✌️ 😁
          remoto!
        </i>
      </Text>
    </Tailwind>
  )
}
