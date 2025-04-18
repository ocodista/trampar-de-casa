'use server'

import { Pool } from 'pg'
import { PostgresClient } from './client'

let client: PostgresClient | null = null

export const getPostgresClient = () => {
  if (!client) {
    console.log('🔌 Connecting to Postgres...')
    const pool = new Pool({
      connectionString: process.env.POSTGRES_URL,
      ssl: false,
    })

    pool.on('connect', () => {
      console.log('✅ Connected to Postgres successfully')
    })

    pool.on('error', (err) => {
      console.error('❌ Postgres connection error:', err.message)
    })

    client = new PostgresClient(pool)
  }

  return client
}
