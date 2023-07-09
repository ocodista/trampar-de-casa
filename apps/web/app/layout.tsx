import './global.css'
import Script from 'next/script'
import { Header } from './components/Header'
import { Metadata } from 'next'
import { Toaster } from './components/ui/toaster'
import { Providers } from './providers'

const title = 'Vagas 100% remotas'
const description =
  'Receba oportunidades de tecnologia no seu e-mail, todas às quartas-feiras.'

export const metadata: Metadata = {
  title,
  description,
  twitter: { title, description },
  openGraph: { title, description },
  keywords:
    'trabalho remoto, emprego remoto, vagas remotas, trabalho em casa, empregos de tecnologia remotos, carreira remota, trabalho flexível, oportunidades de trabalho remoto, empresas remotas',
  robots: 'index, follow',
}

export default function RootLayout({ children }) {
  return (
    <html className="scroll-smooth" lang="ptbr">
      <Script
        strategy="afterInteractive"
        data-domain="trampardecasa.com.br"
        src="https://plausible.io/js/script.js"
      />
      <body>
        <Toaster />
        <nav>
          <Header />
        </nav>
        <main>
          <Providers>{children}</Providers>
        </main>
      </body>
    </html>
  )
}
