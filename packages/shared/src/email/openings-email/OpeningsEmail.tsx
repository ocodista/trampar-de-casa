import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from '@react-email/components'
import { render } from '@react-email/render'
import React from 'react'
import { Opening } from './Opening'
import OpeningList from './OpeningList'
import {
  anchor,
  box,
  container,
  footer,
  h1,
  hr,
  main,
  paragraph,
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
  const previewText = 'Cupom de 30% no FrontInSampa!'
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
              <Heading
                style={h1}
              >{`🔥 ${rolesCount} vagas para você Trampar de Casa`}</Heading>
              <Hr style={hr} />
              <Text style={paragraph}>Olá, admirador do trabalho remoto!</Text>
              <Text style={paragraph}>
                Anote em sua agenda: no sábado, 29 de julho de 2023, reserve o
                dia para participar do FrontInSampa! O evento acontecerá das
                09:00 às 22:00 (BRT) no Gazeta Theatre, localizado na 900
                Avenida Paulista, Bela Vista, SP 01310-100, Brasil.
              </Text>
              <Text style={paragraph}>
                Aproveite nosso cupom exclusivo de 30% de desconto (código:
                <Link
                  style={anchor}
                  href="https://www.eventbrite.com.br/e/frontin-sampa-2023-code-in-the-dark-tickets-574922567877"
                >
                  TRAMPARDECASA30
                </Link>
                )
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

export const openingsEmailHTML = async (
  props: OpeningsEmail & { id: string }
) => {
  const renderedHtml = render(OpeningsEmail(props))
  return renderedHtml
}
