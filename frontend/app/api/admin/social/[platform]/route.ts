import { NextRequest, NextResponse } from 'next/server'
import { client } from '@/src/sanity/client'
import { writeClient, generateId } from '@/src/sanity/writeClient'
import { currentUser } from '@clerk/nextjs/server'
import { groq } from 'next-sanity'

const platformTypeMap: Record<string, string> = {
  spotify: 'spotifyProfile',
  facebook: 'facebookProfile',
  instagram: 'instagramProfile',
  youtube: 'youtubeProfile',
  twitter: 'twitterProfile',
  tiktok: 'tiktokProfile',
}

/**
 * GET /api/admin/social/[platform]
 * Fetch all profiles for a specific platform
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ platform: string }> }
) {
  try {
    const { platform } = await params
    const schemaType = platformTypeMap[platform]
    
    if (!schemaType) {
      return NextResponse.json(
        { error: `Unknown platform: ${platform}` },
        { status: 400 }
      )
    }

    const profiles = await client.fetch(
      groq`*[_type == $type] | order(_createdAt desc) {
        _id,
        _type,
        ...,
        "profilePhoto": profilePhoto->{ image { asset->{ url } } }
      }`,
      { type: schemaType }
    )
    
    return NextResponse.json({ platform, profiles })
  } catch (error) {
    console.error('[API] Failed to fetch platform profiles:', error)
    return NextResponse.json(
      { error: 'Failed to fetch platform profiles' },
      { status: 500 }
    )
  }
}

/**
 * POST /api/admin/social/[platform]
 * Create a new profile for a specific platform
 */
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ platform: string }> }
) {
  try {
    const user = await currentUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { platform } = await params
    const schemaType = platformTypeMap[platform]
    
    if (!schemaType) {
      return NextResponse.json(
        { error: `Unknown platform: ${platform}` },
        { status: 400 }
      )
    }

    const body = await request.json()

    const newProfile = await writeClient.create({
      _id: generateId(platform),
      _type: schemaType,
      ...body,
    })

    return NextResponse.json({ profile: newProfile }, { status: 201 })
  } catch (error) {
    console.error('[API] Failed to create platform profile:', error)
    return NextResponse.json(
      { error: 'Failed to create platform profile' },
      { status: 500 }
    )
  }
}
