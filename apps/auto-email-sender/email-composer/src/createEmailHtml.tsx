import { Body, Head, Html, Tailwind } from '@react-email/components'
import { render } from '@react-email/render'
import React from 'react'

enum HtmlKeys {
  contentHtml = '##CONTENT_HTML',
}
export const renderEmailWrapperHtml = () => {
  const renderedEmailHtml = render(
    <Tailwind>
      <Html>
        <Head />
        <Body
          className="bg-[#f6f9fc]"
          style={{
            fontFamily:
              '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
          }}
        >
          <div className="mx-auto my-0 mb-[64px] max-w-[37.5em] bg-white p-[20px_48px_48px]">
            {HtmlKeys.contentHtml}
          </div>
        </Body>
      </Html>
    </Tailwind>
  )
  return renderedEmailHtml
}
export async function createEmailHtml(
  contentHTML: string,
  renderedEmailWrapperHtml: string
) {
  return renderedEmailWrapperHtml.replace(HtmlKeys.contentHtml, contentHTML)
}
