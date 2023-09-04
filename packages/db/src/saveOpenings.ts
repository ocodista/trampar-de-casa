import { Entities } from "shared"
import { Roles, getSupabaseClient } from '../index'
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

export const saveOpenings = async (openings: Opening[]) => {
  const supabaseClient = getSupabaseClient()
  for (let index = 0; index < openings.length; index++) {
    const { language, location, currency, title, url, headerInfo, company } =
      openings[index]

    const { error, status } = await supabaseClient.from(Entities.Roles).insert({
      language: language === 'Português' ? 'Portuguese' : 'English',
      country: location,
      currency,
      description: headerInfo,
      title,
      url,
      createdAt: new Date(),
      updatedAt: new Date(),
      company 
    } as Roles & { url: string; description: string; updatedAt: Date })
    
    console.log(error, status)
  }
}