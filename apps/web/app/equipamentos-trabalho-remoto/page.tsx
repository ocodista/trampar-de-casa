import { HomeOfficeItems } from '../landing-page/HomeOfficeItems'

export const metadata = {
  title: 'Equipamentos para Trabalho Remoto | Trampar de Casa',
  description:
    'Equipamentos profissionais cuidadosamente selecionados para criar o ambiente de trabalho remoto ideal. Preços atualizados em tempo real.',
  keywords: [
    'trabalho remoto',
    'home office',
    'equipamentos',
    'teclado mecânico',
    'cadeira ergonômica',
    'monitor',
    'mouse',
  ],
}

export default function EquipamentosTrabalhoRemotoPage() {
  return (
    <div className="min-h-screen bg-white">
      <HomeOfficeItems />
    </div>
  )
}
