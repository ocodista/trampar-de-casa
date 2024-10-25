import { createClient } from '@supabase/supabase-js'
import { Database } from 'db'

const supabase = createClient(
  process.env.SUPABASE_URL as string,
  process.env.SUPABASE_SERVICE_ROLE as string
)

type Role = Database['public']['Tables']['Roles']['Row']

type RoleWithInternal = Role & {
  is_internal: Record<string, unknown> | null
  isInternalRole: boolean
}

export async function getRole(id: string) {
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

export async function getRoleWithApplicationType(
  id: string
): Promise<RoleWithInternal> {
  const { data: role, error } = await supabase
    .from('Roles')
    .select(
      `
      *,
      is_internal:RoleOwner!inner(*)
    `
    )
    .eq('id', id)
    .single()

  if (error || !role) {
    throw new Error('Role not found')
  }

  return {
    ...role,
    isInternalRole: Boolean(role.is_internal),
  }
}
