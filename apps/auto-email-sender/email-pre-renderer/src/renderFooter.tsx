import { Link, Tailwind, Text } from '@react-email/components'
import { render } from '@react-email/render'
import React from 'react'
import { getUnsubscribeLink } from './getUnsubscribeLink'

enum HtmlKey {
  unsubscribeLink = '##UNSUBSCRIBE_LINK',
}

export const renderFooterHTML = () => {
  const renderedHtml = render(
    <Tailwind>
      <Text className="text-left text-[8px] leading-[24px] text-[#525f7f]">
        Se por algum motivo você deseja interromper o recebimento destas
        comunicações, entendemos completamente. Nós respeitamos o seu espaço e o
        valorizamos como membro da nossa comunidade. Para se desinscrever, basta
        clicar{' '}
        <Link className="text-[#556cd6]" href={HtmlKey.unsubscribeLink}>
          aqui
        </Link>
        .
      </Text>
    </Tailwind>
  )

  return renderedHtml
}

export function mountFooter(
  id: string,
  urlPrefix: string,
  renderedFooter: string
) {
  const unsubscribeLink = getUnsubscribeLink(urlPrefix, id)

  return renderedFooter.replace(HtmlKey.unsubscribeLink, unsubscribeLink)
}
