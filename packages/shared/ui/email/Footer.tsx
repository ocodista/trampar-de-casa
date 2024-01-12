import { Link, Tailwind, Text } from '@react-email/components'
import React from 'react'

export enum HtmlFooterKeys {
  unsubscribeLink = '##UNSUBSCRIBE_LINK',
}

export const Footer = ({ href }: { href: string }) => {
  return (
    <Tailwind>
      <Text className="text-left text-[8px] leading-[24px] text-[#525f7f]">
        Se por algum motivo você deseja interromper o recebimento destas
        comunicações, entendemos completamente. Nós respeitamos o seu espaço e o
        valorizamos como membro da nossa comunidade. Para se desinscrever, basta
        clicar{' '}
        <Link className="text-[#556cd6]" href={href}>
          aqui
        </Link>
        .
      </Text>
    </Tailwind>
  )
}
