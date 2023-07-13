import ScrollToTopButton from './components/ui/ScrollToTopButton'
import { FAQ } from './landing-page/FAQ'
import { Header } from './landing-page/Header'
import { Hero } from './landing-page/Hero'
import { HowItWorks } from './landing-page/HowItWorks'
import { Values } from './landing-page/Values'

export const revalidate = 5

export default async function Page() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Values />
        <HowItWorks />
        <FAQ />
        <ScrollToTopButton />
      </main>
    </>
  )
}
