import { render } from '@react-email/render'
import React from 'react'
import { Footer } from './Footer'
import { getUnsubscribeLink } from './getUnsubscribeLink'

export function renderFooter(id: string, urlPrefix: string) {
  const unsubscribeLink = getUnsubscribeLink(urlPrefix, id)

  return render(<Footer unsubscribeUrl={unsubscribeLink} />)
}
