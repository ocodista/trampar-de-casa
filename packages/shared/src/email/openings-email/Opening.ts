import { skillArray } from '../../infos/skills'

export type OpeningCurrency = 'U$' | 'R$' | 'EUR'

type Skills =
  | (typeof skillArray)[number]['name']
  | Omit<string, (typeof skillArray)[number]['name']>

export interface Opening {
  company: string
  title: string
  location: string
  language: string
  currency: OpeningCurrency
  skills: [Skills, Skills?, Skills?, Skills?, Skills?]
  headerInfo?: string
  salary?: string
  url: string
}
