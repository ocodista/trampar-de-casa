import { Entities, Topics, skillArray } from 'shared'
import { Opening } from 'shared/ui/email/RoleCard'
import { getPostgresClient } from '../../../postgres/getPostgresClient'
import { Database } from '../../type'
import { SupabaseTable } from '../../utilityTypes'

export type OpeningCurrency = 'U$' | 'R$' | 'EUR'
type Role = SupabaseTable<'Roles'>

type RoleLanguage = Database['public']['Enums']['RoleLanguage']

export const saveOpenings = async (openings: Opening[], topic: Topics) => {
  const pgClient = getPostgresClient()

  for (let index = 0; index < openings.length; index++) {
    const {
      language,
      location,
      currency,
      title,
      url,
      headerInfo,
      company,
      skills,
    } = openings[index]

    const skillsId: Array<string> = skillArray.reduce((prev, { id, name }) => {
      if (skills.includes(name)) {
        return [...prev, String(id)]
      }
      return prev
    }, [] as Array<string>)

    const query = `
      INSERT INTO ${Entities.Roles} (
        language,
        country,
        currency,
        description,
        title,
        url,
        "createdAt",
        "updatedAt",
        company,
        "skillsId",
        "topicId",
        ready
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
      RETURNING *
    `

    const values = [
      language === 'Português' ? 'Portuguese' : 'English',
      location,
      currency,
      headerInfo,
      title,
      url,
      new Date(),
      new Date(),
      company,
      skillsId,
      topic,
      true
    ]

    const { rows } = await pgClient.query(query, values)
    console.log('Inserted role:', rows[0])
  }
}
