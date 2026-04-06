import { NextResponse } from 'next/server'
import { client } from '@/src/sanity/client'
import { ALL_SOCIAL_PROFILES_QUERY } from '@/src/sanity/adminQueries'

/**
 * GET /api/admin/social
 * Fetch all social platform profiles grouped by platform
 */
export async function GET() {
  try {
    const profiles = await client.fetch(ALL_SOCIAL_PROFILES_QUERY)
    
    // Add platform stats
    const stats = {
      spotify: profiles.spotify?.length || 0,
      facebook: profiles.facebook?.length || 0,
      instagram: profiles.instagram?.length || 0,
      youtube: profiles.youtube?.length || 0,
      twitter: profiles.twitter?.length || 0,
      tiktok: profiles.tiktok?.length || 0,
      total: 0,
    }
    stats.total = Object.values(stats).reduce((a, b) => a + b, 0) - stats.total
    
    return NextResponse.json({ profiles, stats })
  } catch (error) {
    console.error('[API] Failed to fetch social profiles:', error)
    return NextResponse.json(
      { error: 'Failed to fetch social profiles' },
      { status: 500 }
    )
  }
}
