import { getPostgresClient } from 'db'
import { Entities } from 'shared'

const pgClient = getPostgresClient()

export async function getRole(id: string) {
  try {
    const query = `
      SELECT *
      FROM "${Entities.Roles}"
      WHERE id = $1
    `
    const result = await pgClient.query(query, [id])
    return { data: result.rows[0], error: null }
  } catch (error) {
    console.error('Get role error:', error)
    return { data: null, error }
  }
}
