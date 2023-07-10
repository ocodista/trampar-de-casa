'use client'
import { QueryClient, QueryClientProvider } from 'react-query'
import ScrollToTopButton from './components/ui/ScrollToTopButton'
import { FAQ } from './landing-page/FAQ'
import { Hero } from './landing-page/Hero'
import { HowItWorks } from './landing-page/HowItWorks'
import { Values } from './landing-page/Values'

const queryClient = new QueryClient()

export default function Page() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <main>
          <Hero />
          <Values />
          <HowItWorks />
          <FAQ />
          <ScrollToTopButton />
        </main>
      </QueryClientProvider>
    </>
  )
}
