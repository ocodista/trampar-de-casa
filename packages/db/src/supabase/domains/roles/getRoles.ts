import { Entities, Views } from 'shared'
import { PostgresClient } from '../../../postgres/client'
import { getPostgresClient } from '../../../postgres/getPostgresClient'

export const getRolesBlock = async (
  start: number,
  end: number,
  postgres: PostgresClient
) => {
  const result = await postgres.query(
    `SELECT * FROM "${Views.RoleSkillsView}" WHERE ready = true ORDER BY "createdAt" DESC LIMIT $1 OFFSET $2`,
    [end - start + 1, start]
  )
  return result.rows
}

export async function* getRolesInBatches(
  postgres: PostgresClient,
  batchSize: number
) {
  let start = 0
  while (true) {
    const roles = await getRolesBlock(start, start + batchSize - 1, postgres)
    if (roles?.length === 0) break
    yield roles
    start += batchSize
  }
}

export const getRoles = async () => {
  const postgres = getPostgresClient()
  const result = await postgres.query(
    `SELECT id, title, url, "topicId" FROM ${Entities.Roles} WHERE ready = true`
  )
  return result.rows
}
