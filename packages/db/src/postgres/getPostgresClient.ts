'use server'

import { Pool } from 'pg'
import dotenv from 'dotenv'
import { PostgresClient } from './client'

dotenv.config()

let client: PostgresClient | null = null

export const getPostgresClient = () => {
  if (!client) {
    const pool = new Pool({
      host: process.env.POSTGRES_HOST || 'localhost',
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