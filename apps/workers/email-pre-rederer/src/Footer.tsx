import { Link, Tailwind, Text } from '@react-email/components'
import React from 'react'

export function Footer({ unsubscribeUrl }: { unsubscribeUrl: string }) {
  return (
    <Tailwind>
      <Text className="text-[#525f7f] text-[8px] leading-[24px] text-left">
        Se por algum motivo você deseja interromper o recebimento destas
        comunicações, entendemos completamente. Nós respeitamos o seu espaço e o
        valorizamos como membro da nossa comunidade. Para se desinscrever, basta
        clicar{' '}
        <Link className="text-[#556cd6]" href={unsubscribeUrl}>
          aqui
        </Link>
        .
      </Text>
    </Tailwind>
  )
}
