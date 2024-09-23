import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/react'
import { Header } from './components/Header'
import { Toaster } from './components/ui/toaster'
import './global.css'
import { Providers } from './providers'

const title = 'Vagas 100% remotas - Trampar de Casa'
const description =
  'Receba oportunidades de tecnologia no seu e-mail, todas às quartas-feiras.'

export const metadata: Metadata = {
  metadataBase: new URL('https://trampardecasa.com.br'),
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
      <head>
        <script
          defer
          data-domain="trampardecasa.com.br"
          src={`http://${process.env.NEXT_PUBLIC_PLAUSIBLE_ADDRESS}/js/script.js`}
        />
      </head>
      <body className="h-full">
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
