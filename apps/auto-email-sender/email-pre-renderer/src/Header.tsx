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

export function Header({ rolesCount }: { rolesCount: number }) {
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
        A edição de hoje é especial, atingimos a marca de 10.000 inscritos 🎉
      </Text>
      <Text className={paragraph}>
        Agradecemos a todo o apoio nessa luta pela defesa do trabalho remoto
        👏😁
      </Text>
      <Text className={paragraph}>
        Gostaríamos de anunciar também a mais nova parceira do Trampar de Casa!
      </Text>
      <Text className={paragraph}>
        Eles vivem, defendem e incentivam o trabalho remoto há mais de 13 anos,
        acreditam em um ambiente de trabalho mais humano, produtivo e que
        promova maior qualidade de vida ❤️
      </Text>
      <Text className={paragraph}>
        É tech, é humano, é{' '}
        <b>
          <Link href="https://impulso.link/mLPmQR">Impulso</Link>
        </b>
        !{' '}
      </Text>

      <Text className={paragraph}>Agora, aproveite as vagas desta semana!</Text>
    </Tailwind>
  )
}
