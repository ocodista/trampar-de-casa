import { Opening } from './Opening'

export const striderOpening = (
  title: string,
  minimumXP: number,
  url: string,
  skills: string[]
): Opening => ({
  company: 'Strider',
  title,
  headerInfo: `Mínimo de ${minimumXP} anos de XP`,
  language: 'Inglês Avançado',
  currency: 'U$',
  location: 'Estados Unidos',
  url,
  skills,
})
