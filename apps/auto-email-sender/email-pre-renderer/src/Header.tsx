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
      <Text className={paragraph} style={{ color: '#000' }}>
        Hoje tenho o prazer de apresentar o <b>Layerform</b>, uma ferramenta
        open-source brasileira desenvolvida para capacitar cada programador a
        criar seu próprio ambiente de staging utilizando apenas arquivos
        Terraform.
      </Text>

      <Text className={paragraph}>
        Queremos que você conheça mais sobre o{' '}
        <Link href="https://github.com/ergomake/layerform">Layerform</Link> e,
        se gostar da ideia, ficaríamos muito agradecidos se deixasse sua ⭐ no{' '}
        <Link href="https://github.com/ergomake/layerform">repositório</Link> do
        Layerform no GitHub.
      </Text>

      <Text className={paragraph}>Agora, aproveite as vagas desta semana!</Text>
    </Tailwind>
  )
}
