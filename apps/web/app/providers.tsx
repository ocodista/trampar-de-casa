'use client'

import React, { FC, ReactNode } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { LoadingProvider } from './contexts/LoadingContext'
import { PostHogProvider } from 'posthog-js/react'
import posthog from 'posthog-js'

if (typeof window !== 'undefined') {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
  })
}

export const Providers: FC<{ children: ReactNode }> = ({ children }) => {
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
      <PostHogProvider client={posthog}>
        <LoadingProvider>{children}</LoadingProvider>
      </PostHogProvider>
    </QueryClientProvider>
  )
}
