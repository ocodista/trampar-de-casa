import {
  Container,
  Heading,
  Hr,
  Img,
  Link,
  Tailwind,
  Text,
} from '@react-email/components'
import React from 'react'

export const HEADER_TITLE_SUFFIX = 'vagas para você Trampar de Casa 🔥'

export function Header({ rolesCount }: { rolesCount: number }) {
  const previewText = `${rolesCount} ${HEADER_TITLE_SUFFIX}`
  const paragraph = 'text-[#525f7f] text-[16px] leading-[24px] text-left'
  return (
    <Tailwind>
      <Container className="flex items-center justify-center">
        <Img
          src="https://trampardecasa.com.br/images/logo.png"
          height={70}
          width={100}
          alt="Logo da Trampar De Casa"
        />
      </Container>
      <Heading className="text-[24px]">{previewText}</Heading>
      <Hr className="border-[#e6ebf1]" />
      <Text className={paragraph}>Bom dia, amantes do trabalho remoto! </Text>
      <Text className={paragraph}>
        Temos uma grande novidade para compartilhar com vocês: fechamos uma
        parceria com a renomada plataforma de desenvolvimento FullStack JS e TS{' '}
        <Link className="text-[#556cd6]" href="https://www.meteor.com/">
          Meteor
        </Link>
        {' - que também é open-source!'}
      </Text>
    </Tailwind>
  )
}
