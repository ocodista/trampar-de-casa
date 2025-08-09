import { getRole } from 'app/utils/getRoles'
import { RolePage } from './RolePage'
import { Metadata } from 'next'

export async function generateMetadata({
  params,
}: {
  params: { id: string }
}): Promise<Metadata> {
  try {
    const role = await getRole(params.id)

    const title = `${role.title} at ${role.company} - Trampar de Casa`
    const description = 'Encontre sua vaga remota aqui !'

    const baseUrl = 'https://trampardecasa.com.br'

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        type: 'website',
        url: `${baseUrl}/vaga/${params.id}`,
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        creator: '@ocodista',
        images: [role.company_logo],
      },
    }
  } catch (error) {
    return {
      title: 'Vaga - Trampar de Casa',
      description: 'Detalhes da vaga não disponíveis no momento.',
    }
  }
}

export default async function Page({ params }: { params: { id: string } }) {
  const role = await getRole(params.id)

  return <RolePage role={role} />
}
