'use client'

import posthog from 'posthog-js'
import { PostHogProvider } from 'posthog-js/react'
import { FC, ReactNode } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { LoadingProvider } from './contexts/LoadingContext'

if (typeof window !== 'undefined') {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
    // Enable debug mode in development
    loaded: (posthog) => {
      // eslint-disable-next-line turbo/no-undeclared-env-vars
      if (process.env.NODE_ENV === 'development') posthog.debug()
    },
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
