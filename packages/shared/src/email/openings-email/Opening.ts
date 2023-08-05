export interface Opening {
  company: string
  title: string
  location: string
  language: string
  currency: 'U$' | 'R$' | 'EUR'
  skills: [string, string?, string?, string?, string?]
  headerInfo?: string
  salary?: string
  url: string
}
