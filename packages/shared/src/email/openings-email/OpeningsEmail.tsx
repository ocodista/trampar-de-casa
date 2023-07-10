import {
  Tailwind,
  Html,
  Head,
  Preview,
  Body,
  Container,
  Section,
  Heading,
  Hr,
  Link,
  Text,
  Img,
} from '@react-email/components'
import { render } from '@react-email/render'
import React from 'react'
import OpeningList from './OpeningList'
import { Opening } from './Opening'
import { main, container, box, h1, hr, paragraph, anchor } from './style'

interface OpeningsEmail {
  globalOpenings: Opening[]
  localOpenings: Opening[]
  feedbackFormUrl: string
}

export const OpeningsEmail = ({
  globalOpenings,
  localOpenings,
  feedbackFormUrl,
}: OpeningsEmail) => {
  const rolesCount = globalOpenings.length + localOpenings.length
  const previewText = `${rolesCount} vagas para você Trampar de Casa 🔥`
  return (
    <Tailwind>
      <Html>
        <Head />
        <Preview>{previewText}</Preview>
        <Body style={main}>
          <Container style={container}>
            <Section style={box}>
              <Container className="flex justify-center items-center">
                <Img
                  src="https://trampardecasa.com.br/images/logo.png"
                  height={70}
                  width={100}
                  alt="Logo da Trampar De Casa"
                />
              </Container>
              <Heading style={h1}>{previewText}</Heading>
              <Hr style={hr} />
              <Text style={paragraph}>Salve!</Text>
              <Text style={paragraph}>Valeu aos que deram seu feedback!</Text>
              <Text style={paragraph}>
                Estamos em busca de mais vagas Jr/Pleno e nosso sistema de vagas
                personalizadas está quase pronto (feito com carinho nas
                madrugadas 😅).
              </Text>
              <Text style={paragraph}>
                Queremos ouvir você, clique{' '}
                <Link style={anchor} href={feedbackFormUrl}>
                  aqui.
                </Link>
              </Text>
              <Text style={paragraph}>Aproveite as melhores vagas.</Text>
              <Text style={paragraph}>Abraços e até logo!</Text>
              <Hr style={hr} />
              <Heading style={h1}>
                🌎 {globalOpenings.length} Vagas internacionais
              </Heading>
              <OpeningList openings={globalOpenings} />
              <Heading style={h1}>
                🇧🇷 {localOpenings.length} Vagas nacionais
              </Heading>
              <OpeningList openings={localOpenings} />
              <Hr style={hr} />
              <Text style={paragraph}>
                Muito obrigado pela sua atenção e tempo!
              </Text>
              <Text style={paragraph}>Até a próxima!</Text>
            </Section>
          </Container>
        </Body>
      </Html>
    </Tailwind>
  )
}

export const openingsEmailHTML = (props: OpeningsEmail): string =>
  render(OpeningsEmail(props))
