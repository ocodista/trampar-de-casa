import { getPostgresClient } from 'db'
import { skillArray } from './skills'

export const updateSkillsOnDatabase = async () => {
  const postgres = getPostgresClient()
  for (const { id, name, normalized } of skillArray) {
    const result = await postgres.query(
      `INSERT INTO Skills (id, name, normalized) 
      VALUES ($1, $2, $3) 
      ON CONFLICT (id) DO UPDATE 
      SET name = $2, normalized = $3`,
      [id, name, normalized]
    )
    if (result.rowCount === 0) throw new Error('Failed to update skill')
  }
}

updateSkillsOnDatabase()
