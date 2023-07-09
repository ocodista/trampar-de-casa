'use client'

import React, { FC, ReactNode } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { LoadingProvider } from './contexts/LoadingContext'

export const Providers: FC<{ children: ReactNode }> = ({ children }) => {
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
      <LoadingProvider>{children}</LoadingProvider>
    </QueryClientProvider>
  )
}
