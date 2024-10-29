'use server'

import { getSupabaseClient } from 'db'

const supabase = getSupabaseClient()

type ProfileData = {
  id: string
  name: string
  englishLevel: 'Beginner' | 'Intermediary' | 'Advanced' | 'Fluent'
  skillsId: string[]
  gitHub: string
  linkedInUrl: string
  startedWorkingAt: string
}

export async function getProfileData(email: string): Promise<ProfileData> {
  const { data, error } = await supabase
    .from('Subscribers')
    .select(
      'id, name, englishLevel, skillsId, gitHub, linkedInUrl, startedWorkingAt'
    )
    .eq('email', email)
    .single()

  if (error) throw error
  return data
}
