import { NextResponse } from 'next/server'
import { getPostgresClient } from 'db'
import { getRedisClient } from '../../utils/getRedisClient'

const checkRedisConnection = async () => {
  try {
    const client = await getRedisClient()
    await client.ping()
    await client.quit()
    return 'Connected'
  } catch (error) {
    return error instanceof Error ? error.message : 'Failed to connect'
  }
}

const checkPostgresConnection = async () => {
  try {
    const postgres = getPostgresClient()
    await postgres.query('SELECT 1')
    return 'Connected'
  } catch (error) {
    return error instanceof Error ? error.message : 'Failed to connect'
  }
}

export async function GET() {
  const [redis, postgres] = await Promise.all([
    checkRedisConnection(),
    checkPostgresConnection(),
  ])

  return NextResponse.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    services: {
      redis,
      postgres,
    },
  })
}
