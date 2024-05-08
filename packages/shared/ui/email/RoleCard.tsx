import React from 'react'
import { skillArray } from '../../src'
import { RoleHTML } from './RoleHTML'

export type OpeningCurrency = 'U$' | 'R$' | 'EUR'

type Skills =
  | (typeof skillArray)[number]['name']
  | Omit<string, (typeof skillArray)[number]['name']>

export interface Opening {
  company: string
  title: string
  location: string
  language: string
  currency: OpeningCurrency | Omit<string, OpeningCurrency>
  skills: [Skills, Skills?, Skills?, Skills?, Skills?]
  headerInfo?: string
  salary?: string
  url: string
}

export const RoleCard = ({
  company,
  headerInfo,
  url,
  title,
  location,
  skills,
  language,
  salary,
}: Omit<Opening, 'skills'> & { skills: string[] }) => {
  const firstSkills = skills.slice(0, 4)
  const roleHTML = RoleHTML({
    company,
    language,
    headerInfo,
    location,
    url,
    title,
    skills: firstSkills,
    salary,
  })
  return <div dangerouslySetInnerHTML={{ __html: roleHTML }} />
}
