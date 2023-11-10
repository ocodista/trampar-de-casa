import { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/react'
import { Header } from './components/Header'
import { Toaster } from './components/ui/toaster'
import './global.css'
import { Providers } from './providers'

const title = 'Vagas 100% remotas'
const description =
  'Receba oportunidades de tecnologia no seu e-mail, todas às quartas-feiras.'

export const metadata: Metadata = {
  title,
  description,
  twitter: {
    title,
    description,
    card: 'summary_large_image',
    creator: '@ocodista',
  },
  openGraph: {
    title,
    description,
  },
  keywords:
    'trabalho remoto, emprego remoto, vagas remotas, trabalho em casa, empregos de tecnologia remotos, carreira remota, trabalho flexível, oportunidades de trabalho remoto, empresas remotas',
  robots: 'index, follow',
}

export default function RootLayout({ children }) {
  return (
    <html className="scroll-smooth" lang="pt-BR">
      <body>
        <Providers>
          <Toaster />
          <nav>
            <Header />
          </nav>
          <main>{children}</main>
        </Providers>
        <Analytics />
      </body>
    </html>
  )
}
