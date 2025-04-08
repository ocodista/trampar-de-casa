'use server'

import { Pool } from 'pg'
import { PostgresClient } from './client'

let client: PostgresClient | null = null

export const getPostgresClient = () => {
  if (!client) {
    const pool = new Pool({
      connectionString: process.env.POSTGRES_URL,
      ssl:
        process.env.NODE_ENV === 'production'
          ? { rejectUnauthorized: false }
          : undefined,
    })
    client = new PostgresClient(pool)
  }

  return client
}
