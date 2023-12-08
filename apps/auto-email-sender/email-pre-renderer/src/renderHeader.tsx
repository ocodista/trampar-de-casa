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
import { render } from '@react-email/render'
import React from 'react'
import { getTestimonialLink } from './getTestimonialLink'

export const HEADER_TITLE_SUFFIX = 'vagas para você Trampar de Casa 🔥'

export enum HeaderHtmlKeys {
  rolesCount = '##ROLES_COUNT',
  testimonialLink = '##GET_JOB_TESTIMONIAL',
}

function Header() {
  const previewText = `${HeaderHtmlKeys.rolesCount} ${HEADER_TITLE_SUFFIX}`
  const h1 = 'text-[24px]'
  const hr = {
    borderColor: '#e6ebf1',
    margin: '20px 0',
  }
  const paragraph = 'text-[#525f7f] text-[16px] leading-[24px] text-left'
  return render(
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
              href={HeaderHtmlKeys.testimonialLink}
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
      >{`🔥 ${HeaderHtmlKeys.rolesCount} vagas para você Trampar de Casa`}</Heading>
      <Hr style={hr} />
      <Text className={paragraph}>Olá, defensor do trabalho remoto!</Text>
      <Text className={paragraph}>Agora, aproveite as vagas desta semana!</Text>
    </Tailwind>
  )
}

export function renderHeaderHtml() {
  return Header()
}

export function mountHeader(
  subscriberId: string,
  urlPrefix: string,
  rolesIds: string[],
  renderedHeader: string
) {
  const testimonialLink = getTestimonialLink(urlPrefix, subscriberId)
  return renderedHeader
    .replaceAll(HeaderHtmlKeys.rolesCount, rolesIds.length.toString())
    .replaceAll(HeaderHtmlKeys.testimonialLink, testimonialLink)
}
