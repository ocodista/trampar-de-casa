import { NextResponse } from 'next/server'
import { getRedisClient } from '../../utils/getRedisClient'

export async function POST() {
  let redis: any = null

  try {
    redis = await getRedisClient()

    // Clear all amazon-product cache keys
    const keys = await redis.keys('amazon-product:*')

    if (keys.length > 0) {
      await redis.del(keys)

      return NextResponse.json({
        success: true,
        message: `Cleared ${keys.length} cached products`,
        clearedKeys: keys,
        timestamp: Date.now(),
      })
    } else {
      return NextResponse.json({
        success: true,
        message: 'No cache keys found to clear',
        clearedKeys: [],
        timestamp: Date.now(),
      })
    }
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to clear cache',
        message: error instanceof Error ? error.message : 'Unknown error',
        timestamp: Date.now(),
      },
      { status: 500 }
    )
  } finally {
    // Close Redis connection
    if (redis) {
      try {
        await redis.quit()
      } catch (closeError) {
        // Silently handle error
      }
    }
  }
}

// Also allow GET for easy testing
export async function GET() {
  return NextResponse.json({
    message: 'Use POST method to clear the cache',
    example: 'curl -X POST /api/clear-cache',
    timestamp: Date.now(),
  })
}
