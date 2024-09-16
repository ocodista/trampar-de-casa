import { createClient } from '@supabase/supabase-js'
import { RolePage } from './RolePage'

const supabase = createClient(
  process.env.SUPABASE_URL as string,
  process.env.SUPABASE_SERVICE_ROLE as string
)

async function getRole(id: string) {
  const { data: vaga, error } = await supabase
    .from('Roles')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    throw new Error('Erro ao buscar a vaga: ' + error.message)
  }

  return vaga
}

export default async function Page({ params }: { params: { id: string } }) {
  const role = await getRole(params.id)

  return <RolePage vaga={role} />
}
