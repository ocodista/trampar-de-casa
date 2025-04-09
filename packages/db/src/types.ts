import { EnglishLevel } from '../../../apps/web/global/EnglishLevel'

export interface Subscriber {
  id: string
  email: string
  name: string | null
  linkedInUrl: string | null
  gitHub: string | null
  startedWorkingAt: Date | null
  skillsId: string[] | null
  englishLevel: EnglishLevel | null
  sendBestOpenings: boolean
  optOut: boolean
  isConfirmed: boolean
  createdAt: Date
  updatedAt: Date
}

export interface SubscriberTopic {
  subscriberId: string
  topicId: number
  createdAt: Date
}

export interface Topic {
  id: number
  name: string
  createdAt: Date
}

export interface Role {
  id: string
  title: string
  company: string
  description: string
  salary: string
  currency: string
  country: string
  language: 'English' | 'Portuguese'
  minimumYears: number
  topicId: number
  url: string
  createdAt: Date
  updatedAt: Date
}

export interface RoleRecommendation {
  id: string
  title: string
  company: string
  description: string
  salary: number
  currency: string
  country: string
  language: 'English' | 'Portuguese'
  minimumYears: number
  topicId: number
  url: string
  createdAt: Date
  updatedAt: Date
}

export interface Skill {
  id: string
  name: string
  createdAt: Date
}

export interface SubscriberRole {
  subscriberId: string
  roleId: string
  createdAt: Date
}

export interface SkillInRole {
  id: number
  name: string
  emoji: string
  normalized: string
}

export interface CountryInRole {
  country: string
  count: number
}
