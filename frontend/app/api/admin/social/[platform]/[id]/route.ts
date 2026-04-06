import { NextRequest, NextResponse } from 'next/server'
import { client } from '@/src/sanity/client'
import { writeClient } from '@/src/sanity/writeClient'
import { currentUser } from '@clerk/nextjs/server'
import { groq } from 'next-sanity'

/**
 * GET /api/admin/social/[platform]/[id]
 * Fetch a single social profile by ID
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ platform: string; id: string }> }
) {
  try {
    const { id } = await params
    
    const profile = await client.fetch(
      groq`*[_id == $id][0] {
        _id,
        _type,
        ...,
        "profilePhoto": profilePhoto->{ 
          _id,
          image { asset->{ _id, url, metadata { dimensions, lqip } } }
        },
        "bannerImage": bannerImage->{ 
          _id,
          image { asset->{ _id, url } }
        },
        "headerImage": headerImage->{ 
          _id,
          image { asset->{ _id, url } }
        }
      }`,
      { id }
    )
    
    if (!profile) {
      return NextResponse.json({ error: 'Profile not found' }, { status: 404 })
    }
    
    return NextResponse.json({ profile })
  } catch (error) {
    console.error('[API] Failed to fetch social profile:', error)
    return NextResponse.json(
      { error: 'Failed to fetch social profile' },
      { status: 500 }
    )
  }
}

/**
 * PUT /api/admin/social/[platform]/[id]
 * Update a social profile
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ platform: string; id: string }> }
) {
  try {
    const user = await currentUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params
    const body = await request.json()

    // Remove _id and _type from updates
    const { _id, _type, ...updates } = body

    const updatedProfile = await writeClient
      .patch(id)
      .set(updates)
      .commit()

    return NextResponse.json({ profile: updatedProfile })
  } catch (error) {
    console.error('[API] Failed to update social profile:', error)
    return NextResponse.json(
      { error: 'Failed to update social profile' },
      { status: 500 }
    )
  }
}

/**
 * DELETE /api/admin/social/[platform]/[id]
 * Delete a social profile
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ platform: string; id: string }> }
) {
  try {
    const user = await currentUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params
    await writeClient.delete(id)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[API] Failed to delete social profile:', error)
    return NextResponse.json(
      { error: 'Failed to delete social profile' },
      { status: 500 }
    )
  }
}
