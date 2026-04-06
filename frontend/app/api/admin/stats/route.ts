import { NextResponse } from 'next/server'
import { client } from '@/src/sanity/client'
import { ADMIN_STATS_QUERY } from '@/src/sanity/adminQueries'

/**
 * GET /api/admin/stats
 * Fetch dashboard statistics
 */
export async function GET() {
  try {
    const stats = await client.fetch(ADMIN_STATS_QUERY)
    return NextResponse.json({ stats })
  } catch (error) {
    console.error('[API] Failed to fetch stats:', error)
    return NextResponse.json(
      { error: 'Failed to fetch stats' },
      { status: 500 }
    )
  }
}
