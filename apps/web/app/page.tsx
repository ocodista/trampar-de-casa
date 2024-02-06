import { Testimonial } from './components/testimonial'
import ScrollToTopButton from './components/ui/ScrollToTopButton'
import { FAQ } from './landing-page/FAQ'
import { Hero } from './landing-page/Hero'
import { HowItWorks } from './landing-page/HowItWorks'
import { Values } from './landing-page/Values'

export const revalidate = 14_400 // 4 hours

export default async function Page() {
  return (
    <>
      <main>
        <Hero />
        <Testimonial />
        <Values />
        <HowItWorks />
        <FAQ />
        <ScrollToTopButton />
      </main>
    </>
  )
}
