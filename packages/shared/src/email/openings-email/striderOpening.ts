import { Opening } from './Opening'

type OpeningSalary = Opening['skills']

export const striderOpening = (
  title: string,
  minimumXP: number,
  url: string,
  skills: OpeningSalary,
  salary?: string
): Opening => ({
  company: 'Strider',
  title,
  headerInfo: `Mínimo de ${minimumXP} anos de XP${
    salary ? ` (${salary})` : ''
  }`,
  language: 'Inglês Avançado',
  currency: 'U$',
  location: 'Estados Unidos',
  url,
  skills,
})
