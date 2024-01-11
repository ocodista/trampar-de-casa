import { render } from '@react-email/render'
import React from 'react'
import { Header, HeaderHtmlKeys } from 'shared/ui/email/Header'
import { getTestimonialLink } from './getTestimonialLink'

export const HEADER_TITLE_SUFFIX = 'vagas para você Trampar de Casa 🔥'

function RenderHeaderHtml() {
  return render(
    <Header
      rolesCount={HeaderHtmlKeys.rolesCount}
      testimonialLink={HeaderHtmlKeys.testimonialLink}
    />
  )
}

export function renderHeaderHtml() {
  return RenderHeaderHtml()
}

export function mountHeader(
  subscriberId: string,
  urlPrefix: string,
  rolesIds: string[],
  renderedHeader: string
) {
  const testimonialLink = getTestimonialLink(urlPrefix, subscriberId)
  return renderedHeader
    .replaceAll(HeaderHtmlKeys.rolesCount, rolesIds.length.toString())
    .replaceAll(HeaderHtmlKeys.testimonialLink, testimonialLink)
}
