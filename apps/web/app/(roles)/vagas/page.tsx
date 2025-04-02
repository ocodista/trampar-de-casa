'use server'

import { getPostgresClient } from 'db'
import { Role, SkillInRole, CountryInRole } from 'db/src/types'
import { RolesPage } from './RolesPage'
import { fetchJobs } from './action'

const db = getPostgresClient()

const getCountriesInRoles = async () => {
  return db.getCountriesInRoles()
}

const getSkillsInRoles = async () => {
  return db.getSkillsInRoles()
}

async function getJobs(): Promise<Role[]> {
  return fetchJobs({})
}

export default async function VagasPage() {
  const [jobs, skills, countries] = await Promise.all([
    getJobs(),
    getSkillsInRoles(),
    getCountriesInRoles(),
  ])

  const formattedSkills = skills.map((skill: SkillInRole) => ({
    emoji: '💻',
    id: Number(skill.id),
    name: skill.name,
    normalized: skill.name.toLowerCase(),
  }))

  const formattedCountries = countries.map((country: CountryInRole) => ({
    emoji: '🌍',
    id: country.country,
    name: country.country,
    normalized: country.country.toLowerCase(),
  }))

  return (
    <RolesPage
      jobsFromServer={jobs}
      skillsFromServer={formattedSkills}
      countries={formattedCountries}
    />
  )
}
