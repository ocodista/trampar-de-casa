'use client'
import { SupabaseView } from 'db/src/supabase/utilityTypes'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'

type Roles = SupabaseView<'RolesSkillsView'>

export const useRoles = () => {
  const [roles, setRoles] = useState<Roles[] | null>(null)
  const [totalPages, setTotalPages] = useState<number | null>(null)
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const current = new URLSearchParams(Array.from(searchParams.entries()))
  const router = useRouter()

  const fetchOpenings = async () => {
    const response = await fetch(`/api/vagas?${current.toString()}`)

    if (!response.ok) {
      console.error('Error on fetch')
      return
    }
    const data = (await response.json()) as {
      roles: Roles[]
      totalPages: number
    }
    console.log(data.roles)
    setRoles(data.roles)
    setTotalPages(data.totalPages)
  }

  const search = async (query: string) => {
    current.set('query', query)
    current.set('page', '1')
    router.replace(`${pathname}?${current.toString()}`)
    await fetchOpenings()
  }

  return {
    roles,
    search,
    totalPages,
  }
}
