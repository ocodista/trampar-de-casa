import ScrollToTopButton from './components/ui/ScrollToTopButton'
import { FAQ } from './landing-page/FAQ'
import { Hero } from './landing-page/Hero'
import { HowItWorks } from './landing-page/HowItWorks'
import { Values } from './landing-page/Values'

const FOUR_HOURS = 60 * 60 * 4
export const revalidate = FOUR_HOURS

export default async function Page() {
  return (
    <>
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
