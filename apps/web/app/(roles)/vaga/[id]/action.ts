'use server'

import { getSupabaseClient } from 'db'

const supabase = getSupabaseClient()

export const getProfileData = async (email: string) => {
  const { data: profile, error } = await supabase
    .from('Subscribers')
    .select(
      `
    name,
    englishLevel,
    skillsId,
    gitHub,
    linkedInUrl,
    startedWorkingAt
  `
    )
    .eq('email', email)
    .single()

  if (error) throw error

  return profile
}
