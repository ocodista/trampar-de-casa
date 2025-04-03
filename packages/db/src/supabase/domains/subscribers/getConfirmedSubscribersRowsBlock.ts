import { PostgresClient } from '../../../postgres/client'
import { Entities } from 'shared'

interface GetRowsBlock {
  postgres: PostgresClient
  selectQuery?: string
  start: number
  end: number
}

export const getConfirmedSubscribersRowsBlock = async ({
  postgres,
  start,
  end,
  selectQuery,
}: GetRowsBlock): Promise<any[]> => {
  const result = await postgres.query(
    `SELECT ${selectQuery || '*'} FROM ${Entities.Subcribers} 
    WHERE "isConfirmed" = true AND "optOut" = false 
    ORDER BY "createdAt" DESC 
    LIMIT $1 OFFSET $2`,
    [end - start + 1, start]
  )
  return result.rows
}
