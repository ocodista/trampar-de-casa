'use client'
import React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Header } from './landing-page/Header'
import { Hero } from './landing-page/hero/Hero'
import { Values } from './landing-page/Values'
import { FAQ } from './landing-page/FAQ'
import { HowItWorks } from './landing-page/HowItWorks'

export default function Page() {
  const queryClient = new QueryClient()
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Header />
        <main>
          <Hero />
          <Values />
          <HowItWorks />
          <FAQ />
        </main>
      </QueryClientProvider>
    </>
  )
}
