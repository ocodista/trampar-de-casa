'use server'

import { Pool } from 'pg'
import { PostgresClient } from './client'

let client: PostgresClient | null = null

export const getPostgresClient = () => {
  if (!client) {
    // During build time or when env vars are not set, return a mock client
    if (process.env.NEXT_PHASE === 'build' || !process.env.POSTGRES_HOST) {
      return new PostgresClient(null)
    }

    const pool = new Pool({
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT || '5432'),
      user: process.env.POSTGRES_USER || 'postgres',
      password: process.env.POSTGRES_PASSWORD || 'postgres',
      database: process.env.POSTGRES_DB || 'postgres',
      ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : undefined,
    })
    client = new PostgresClient(pool)
  }

  return client
} 