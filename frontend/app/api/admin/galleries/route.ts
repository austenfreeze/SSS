import { NextRequest, NextResponse } from 'next/server'
import { client } from '@/src/sanity/client'
import { writeClient, generateId } from '@/src/sanity/writeClient'
import { GALLERIES_QUERY } from '@/src/sanity/adminQueries'
import { currentUser } from '@clerk/nextjs/server'

/**
 * GET /api/admin/galleries
 * Fetch all galleries
 */
export async function GET() {
  try {
    const galleries = await client.fetch(GALLERIES_QUERY)
    return NextResponse.json({ galleries })
  } catch (error) {
    console.error('[API] Failed to fetch galleries:', error)
    return NextResponse.json(
      { error: 'Failed to fetch galleries' },
      { status: 500 }
    )
  }
}

/**
 * POST /api/admin/galleries
 * Create a new gallery
 */
export async function POST(request: NextRequest) {
  try {
    const user = await currentUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { title, description, visibility, photos } = body

    if (!title) {
      return NextResponse.json(
        { error: 'Missing required field: title' },
        { status: 400 }
      )
    }

    // Generate slug from title
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')

    const newGallery = await writeClient.create({
      _id: generateId('gallery'),
      _type: 'gallery',
      title,
      slug: { current: slug },
      description: description || '',
      visibility: visibility || 'public',
      sortOrder: 0,
      photos: photos?.map((photoId: string, index: number) => ({
        _key: generateId('ref'),
        _type: 'reference',
        _ref: photoId,
      })) || [],
      metadata: {
        photoCount: photos?.length || 0,
        createdAt: new Date().toISOString(),
      },
    })

    return NextResponse.json({ gallery: newGallery }, { status: 201 })
  } catch (error) {
    console.error('[API] Failed to create gallery:', error)
    return NextResponse.json(
      { error: 'Failed to create gallery' },
      { status: 500 }
    )
  }
}
