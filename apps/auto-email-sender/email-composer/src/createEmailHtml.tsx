import { Body, Head, Html, Tailwind } from '@react-email/components'
import { render } from '@react-email/render'
import React from 'react'

export async function createEmailHtml(contentHTML: string) {
  return render(
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
          <div
            className="mx-auto my-0 mb-[64px] max-w-[37.5em] bg-white p-[20px_48px_48px]"
            dangerouslySetInnerHTML={{
              __html: contentHTML,
            }}
          />
        </Body>
      </Html>
    </Tailwind>
  )
}
