import { getPostgresClient } from './getPostgresClient'

async function testConnection() {
  const pool = getPostgresClient()

  try {
    const result = await pool.query('SELECT NOW()')
    console.log('PostgreSQL connection successful!')
    console.log('Current timestamp:', result.rows[0].now)
    console.log('Connection settings:', {
      host: process.env.POSTGRES_HOST || 'localhost',
      port: process.env.POSTGRES_PORT || '5432',
      user: process.env.POSTGRES_USER || 'postgres',
      database: process.env.POSTGRES_DB || 'postgres',
    })
  } catch (error) {
    console.error('PostgreSQL connection failed:', error)
  } finally {
    await pool.end()
  }
}

testConnection() 