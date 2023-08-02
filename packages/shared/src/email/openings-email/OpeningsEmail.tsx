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
import { RedisClientType } from 'redis'
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
  const previewText = 'R$130 de desconto na compra de uma Mesa Slikdesk!'
  return (
    <Tailwind>
      <Html>
        <Head />
        <Preview>{previewText}</Preview>
        <Body style={main}>
          <Container style={container}>
            <Section style={box}>
              <Container className="flex items-center justify-center">
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
              <Text style={paragraph}>Olá, defensor do trabalho remoto!</Text>
              <Text style={{ ...paragraph, color: '#000' }}>
                <b>Bora Trampar de Casa com a Slikdesk!</b>
              </Text>
              <Text>
                Trampar de Casa combina com{' '}
                <b>praticidade, conforto, ergonomia e tecnologia</b>. A nossa
                nova parceira, Slikdesk, oferece tudo isso e muito mais,{' '}
                elevando sua saúde e dando um upgrade no setup. São diversos
                modelos de mesas com regulagem de altura (manual ou elétrica),
                bases com regulagem, cadeira e acessórios indispensáveis para
                qualquer dev.
              </Text>
              <Text>
                E tem presente para você: R$130 de desconto nas standing desks!
                <br />
                Acesse a{' '}
                <Link href="https://slik.com.br/trampardecasa">
                  slik.com.br/trampardecasa
                </Link>{' '}
                e use o cupom <b>TRAMPARDECASA</b>
              </Text>

              <Text style={paragraph}>
                O seu feedback nos ajuda <strong>demais</strong>, clique{' '}
                <Link style={anchor} href={feedbackFormUrl}>
                  aqui.
                </Link>
              </Text>
              <Text style={paragraph}>
                Agora, aproveite as vagas desta semana!
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
export const openingsEmailHTML = async ({
  redis,
  ...props
}: OpeningsEmail & { id: string; redis: RedisClientType }) => {
  const renderedHtmlPersisted = await redis.get(`OPENING_HTML:${props.id}`)

  if (renderedHtmlPersisted) {
    return renderedHtmlPersisted
  }
  const renderedHtml = render(OpeningsEmail(props))
  await redis.set(`OPENING_HTML:${props.id}`, renderedHtml)
  return renderedHtml
}
