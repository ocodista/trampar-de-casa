import {
  Container,
  Heading,
  Hr,
  Img,
  Link,
  Preview,
  Tailwind,
  Text,
} from '@react-email/components'
import React from 'react'

export const HEADER_TITLE_SUFFIX = 'vagas para você Trampar de Casa 🔥'

const button = {
  backgroundColor: '#020617',
  borderRadius: '3px',
  color: '#fff',
  fontSize: '16px',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'block',
}

export function Header({
  rolesCount,
  userId,
}: {
  rolesCount: number
  userId: string
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
      >{`🔥 ${rolesCount} vagas para você Trampar de Casa`}</Heading>
      <Hr style={hr} />
      <Text className={paragraph}>Olá, defensor do trabalho remoto!</Text>
      <Text className={paragraph}>
        Espero que estejam gostando das vagas personalizadas, estamos sempre
        abertos a novas sugestões através de nosso{' '}
        <Link href="https://github.com/ocodista/trampar-de-casa/issues">
          link para issues(github)
        </Link>
        .
      </Text>
      <Text className={paragraph}>Agora, aproveite as vagas desta semana!</Text>
    </Tailwind>
  )
}
