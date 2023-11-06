'use client'
import { SupabaseView } from 'db/src/supabase/utilityTypes'
import { useEffect, useState } from 'react'

type Roles = SupabaseView<'RolesSkillsView'>

export const useRoles = () => {
  const [roles, setRoles] = useState<Roles[] | null>(null)

  const fetchOpenings = async () => {
    const response = await fetch('/api/vagas')

    if (!response.ok) {
      console.error('Error on fetch')
      return
    }
    const data = (await response.json()) as Roles[]
    setRoles(data)
  }

  useEffect(() => {
    fetchOpenings()
  }, [])

  return {
    openings: roles,
  }
}
