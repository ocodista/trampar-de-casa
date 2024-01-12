import { render } from '@react-email/render'
import React from 'react'
import { Footer, HtmlFooterKeys } from 'shared/ui/email/Footer'
import { getUnsubscribeLink } from './getUnsubscribeLink'

export const renderFooterHTML = () => {
  const renderedHtml = render(<Footer href={HtmlFooterKeys.unsubscribeLink} />)

  return renderedHtml
}

export function mountFooter(
  id: string,
  urlPrefix: string,
  renderedFooter: string
) {
  const unsubscribeLink = getUnsubscribeLink(urlPrefix, id)

  return renderedFooter.replace(HtmlFooterKeys.unsubscribeLink, unsubscribeLink)
}
