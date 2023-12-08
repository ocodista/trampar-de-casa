import {
  Container,
  Heading,
  Hr,
  Img,
  Preview,
  Tailwind,
  Text,
} from '@react-email/components'
import { render } from '@react-email/render'
import React from 'react'

export const HEADER_TITLE_SUFFIX = 'vagas para você Trampar de Casa 🔥'

export enum HeaderHtmlKeys {
  rolesCount = '##ROLES_COUNT',
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
      <Container className="flex items-center justify-center">
        <Img
          src="https://trampardecasa.com.br/images/logo.png"
          height={70}
          width={100}
          alt="Logo da Trampar De Casa"
        />
      </Container>
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

export function mountHeader(rolesIds: string[], renderedHeader: string) {
  return renderedHeader.replaceAll(
    HeaderHtmlKeys.rolesCount,
    rolesIds.length.toString()
  )
}
