'use server'

import { getPostgresClient } from 'db'
import { Entities } from 'shared'

export async function getRole(id: string) {
  const pgClient = getPostgresClient()

  try {
    const query = `
      SELECT *
      FROM "${Entities.Roles}"
      WHERE id = $1
    `
    const result = await pgClient.query(query, [id])

    if (!result.rows.length) {
      return null
    }

    return result.rows[0]
  } catch (error) {
    console.error('Get role error:', error)
    return null
  }
}
