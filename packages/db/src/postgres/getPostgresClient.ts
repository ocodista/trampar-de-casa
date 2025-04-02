import { Pool } from 'pg'
import dotenv from 'dotenv'

dotenv.config()

let pool: Pool | null = null

export const getPostgresClient = () => {
  if (!pool) {
    pool = new Pool({
      host: process.env.POSTGRES_HOST || 'localhost',
      port: parseInt(process.env.POSTGRES_PORT || '5432'),
      user: process.env.POSTGRES_USER || 'postgres',
      password: process.env.POSTGRES_PASSWORD || 'postgres',
      database: process.env.POSTGRES_DB || 'postgres',
    })
  }

  return pool
} 