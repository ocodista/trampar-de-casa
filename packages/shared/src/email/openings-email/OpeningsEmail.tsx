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
import {
  main,
  container,
  box,
  h1,
  hr,
  paragraph,
  anchor,
  footer,
} from './style'

interface OpeningsEmail {
  globalOpenings: Opening[]
  localOpenings: Opening[]
  feedbackFormUrl: string
  unsubscribeUrl: string
}

export const OpeningsEmail = ({
  globalOpenings,
  localOpenings,
  feedbackFormUrl,
  unsubscribeUrl,
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
              <Text style={paragraph}>
                Bom dia, amantes do trabalho remoto!{' '}
              </Text>
              <Text style={paragraph}>
                Temos uma grande novidade para compartilhar com vocês: fechamos
                uma parceria com a renomada plataforma de desenvolvimento
                FullStack JS e TS{' '}
                <Link style={anchor} href="https://www.meteor.com/">
                  Meteor
                </Link>
                {' - que também é open-source!'}
              </Text>
              <Text style={paragraph}>
                O seu feedback nos ajuda <strong>demais</strong>, clique{' '}
                <Link style={anchor} href={feedbackFormUrl}>
                  aqui.
                </Link>
              </Text>
              <Text style={paragraph}>
                Agora, é hora de você aproveitar as oportunidades de vagas.
                Esperamos que goste!
              </Text>
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
              <Text style={paragraph}></Text>
              <Text style={footer}>
                Se por algum motivo você deseja interromper o recebimento destas
                comunicações, entendemos completamente. Nós respeitamos o seu
                espaço e o valorizamos como membro da nossa comunidade. Para se
                desinscrever, basta clicar{' '}
                <Link style={anchor} href={unsubscribeUrl}>
                  aqui
                </Link>
                .
              </Text>
            </Section>
          </Container>
        </Body>
      </Html>
    </Tailwind>
  )
}

export const openingsEmailHTML = (props: OpeningsEmail): string =>
  render(OpeningsEmail(props))
