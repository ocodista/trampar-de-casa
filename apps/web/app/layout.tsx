import { Metadata } from "next";
import { Toaster } from "../global/components/ui/toaster";
import "./global.css";
import { Header } from "./components/Header";

export const metadata: Metadata = {
  title: 'Vagas 100% remotas',
  description: 'Descubra as melhores oportunidades de trabalho remoto e mude para um estilo de vida mais flexível e equilibrado. Conectamos profissionais a empresas globais que valorizam a liberdade e a eficácia do trabalho remoto.',
  keywords: 'trabalho remoto, emprego remoto, vagas remotas, trabalho em casa, empregos de tecnologia remotos, carreira remota, trabalho flexível, oportunidades de trabalho remoto, empresas remotas',
  robots: 'index, follow'
}

export default function RootLayout ({ children }) {
  return (
    <html className="scroll-smooth" lang="ptbr">
      <body>
        <nav>
          <Header />
        </nav>
        <main>
          {children}
        </main>
        <Toaster />
      </body>
    </html>
  );
}
