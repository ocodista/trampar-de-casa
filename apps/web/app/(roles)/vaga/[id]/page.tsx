import { createClient } from '@supabase/supabase-js'
import { RolePage } from './RolePage'
import { Metadata } from 'next'

const supabase = createClient(
  process.env.SUPABASE_URL as string,
  process.env.SUPABASE_SERVICE_ROLE as string
)

async function getRole(id: string) {
  const { data: role, error } = await supabase
    .from('Roles')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    throw new Error('Error fetching role: ' + error.message)
  }

  return role
}

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

    const fallbackImageUrl = `${baseUrl}/images/HO-brasil.jpg`

    const imageUrl = role.company_logo || fallbackImageUrl

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        type: 'website',
        url: `${baseUrl}/vaga/${params.id}`,
        images: [
          {
            url: imageUrl,
            width: 1200,
            height: 630,
            alt: title,
          },
        ],
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
    console.error('Error generating metadata:', error)
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
