import { Metadata } from 'next'
import './global.css'
import Script from 'next/script'
import { LoadingProvider } from './contexts/LoadingContext'
import { Toaster } from './components/ui/toaster'

export const metadata: Metadata = {
  title: 'Vagas 100% remotas',
  description:
    'Descubra as melhores oportunidades de trabalho remoto e mude para um estilo de vida mais flexível e equilibrado. Conectamos profissionais a empresas globais que valorizam a liberdade e a eficácia do trabalho remoto.',
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
        <LoadingProvider>
          {children}
          <Toaster />
        </LoadingProvider>
      </body>
    </html>
  )
}
