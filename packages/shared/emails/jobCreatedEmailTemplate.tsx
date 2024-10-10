import { Html, Link, Section, Text } from '@react-email/components'
import * as React from 'react'

export default function JobCreatedEmailTemplate() {
  return (
    <Html>
      <Section>
        <Text>Parabéns! Sua vaga foi criada com sucesso.</Text>
        <Text>Título da vaga: $JOB_TITLE</Text>
        <Text>ID da vaga: $JOB_ID</Text>
        <Text>Você pode visualizar sua vaga aqui:</Text>
        <Link href="$JOB_LINK">Ver vaga</Link>
      </Section>
    </Html>
  )
}
