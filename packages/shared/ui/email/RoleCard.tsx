import { Column, Heading, Row, Tailwind } from '@react-email/components'
import React from 'react'
import { skillArray } from '../../src'
import { RoleHTML } from './RoleHTML'

interface Skill {
  name: string
}

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

const Skill = ({ name }: Skill) => (
  <div className="mb-1 whitespace-nowrap rounded-2xl border-2 border-solid border-black bg-zinc-200 px-4 py-1.5 text-xs">
    {name}
  </div>
)

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
