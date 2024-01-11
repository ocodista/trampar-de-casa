import { Body, Head, Html, Tailwind } from '@react-email/components'
import React, { ReactNode } from 'react'
export const EmailWrapper = ({ children }: { children: ReactNode }) => {
  return (
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
            {children}
          </div>
        </Body>
      </Html>
    </Tailwind>
  )
}
