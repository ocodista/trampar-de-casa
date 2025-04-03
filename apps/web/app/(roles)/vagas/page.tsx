'use server'

import { getPostgresClient } from 'db'
import { SkillInRole, CountryInRole } from 'db/src/types'
import { RolesPage } from './RolesPage'
import { fetchJobs } from './action'

const db = getPostgresClient()

const getCountriesInRoles = async () => {
  return db.getCountriesInRoles()
}

const getSkillsInRoles = async () => {
  return db.getSkillsInRoles()
}

export default async function VagasPage() {
  const [jobs, skills, countries] = await Promise.all([
    fetchJobs({}),
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
