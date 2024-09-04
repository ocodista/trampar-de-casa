import { render } from '@react-email/render'
import React from 'react'
import { EmailWrapper } from 'shared/ui/email/EmailWrapper'

enum HtmlKeys {
  contentHtml = '##CONTENT_HTML',
}

export const renderEmailWrapperHtml = () => {
  const renderedEmailHtml = render(
    <EmailWrapper>{HtmlKeys.contentHtml}</EmailWrapper>
  )
  return renderedEmailHtml
}
export async function createEmailHtml(
  contentHTML: string,
  renderedEmailWrapperHtml: string
) {
  return renderedEmailWrapperHtml.replace(HtmlKeys.contentHtml, contentHTML)
}
