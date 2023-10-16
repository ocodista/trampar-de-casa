import { Entities, Topics, skillArray } from "shared"
import { getSupabaseClient } from '../../../../index'
import type { Database } from '../../../supabase/type'

export type OpeningCurrency = 'U$' | 'R$' | 'EUR'

export interface Opening {
  company: string
  title: string
  location: string
  language: string
  currency: OpeningCurrency
  skills: [string, string?, string?, string?, string?]
  headerInfo?: string
  salary?: string
  url: string
}
type RoleLanguage = Database['public']['Enums']['RoleLanguage']

export const saveOpenings = async (openings: Opening[], topic: Topics) => {
  const supabaseClient = getSupabaseClient()
  for (let index = 0; index < openings.length; index++) {
    const { language, location, currency, title, url, headerInfo, company, skills } =
      openings[index]

    const skillsId: Array<string> = skillArray.reduce((prev, currentSkill, index) => {
      if(skills.includes(currentSkill)){
        return [...prev, String(index)]
      }
      return prev
    }, [] as Array<string>)
    const { error, status } = await supabaseClient.from(Entities.Roles).insert({
      language: language === 'Português' ? 'Portuguese' : 'English' as RoleLanguage,
      country: location,
      currency,
      description: headerInfo,
      title,
      url,
      createdAt: new Date(),
      updatedAt: new Date(),
      company,
      skillsId,
      topicId: topic,
    })
    
    console.log(error, status)
  }
}