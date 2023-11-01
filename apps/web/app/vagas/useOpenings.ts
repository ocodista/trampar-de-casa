'use client'
import { SupabaseView } from 'db/src/supabase/utilityTypes'
import { useEffect, useState } from 'react'

type Openings = SupabaseView<'RolesSkillsView'>

export const useOpenings = () => {
  const [openings, setOpenings] = useState<Openings[] | null>(null)

  const fetchOpenings = async () => {
    const response = await fetch('/api/vagas')

    if (!response.ok) {
      console.error('Error on fetch')
      return
    }
    const data = (await response.json()) as Openings[]
    setOpenings(data)
  }

  useEffect(() => {
    fetchOpenings()
  }, [])

  return {
    openings,
  }
}
