'use client'
import { SupabaseView } from 'db/src/supabase/utilityTypes'
import { ReactNode, createContext, useContext } from 'react'
import { useRoles } from './useRoles'

type RolesContext = {
  search: (search: string) => Promise<void>
  roles: Roles[]
  totalPages: number
}

type Roles = SupabaseView<'RolesSkillsView'>
const context = createContext<RolesContext | null>(null)

export function RolesContextWrapper({ children }: { children: ReactNode }) {
  const { roles, search, totalPages } = useRoles()
  return (
    <context.Provider value={{ roles, search, totalPages }}>
      {children}
    </context.Provider>
  )
}

export const useRoleContext = () => {
  const currentContent = useContext(context)
  if (!currentContent) throw new Error('Invalid role context')

  return currentContent
}
