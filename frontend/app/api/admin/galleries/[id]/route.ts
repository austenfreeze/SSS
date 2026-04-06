import { NextRequest, NextResponse } from 'next/server'
import { client } from '@/src/sanity/client'
import { writeClient, generateId } from '@/src/sanity/writeClient'
import { GALLERY_BY_ID_QUERY } from '@/src/sanity/adminQueries'
import { currentUser } from '@clerk/nextjs/server'

/**
 * GET /api/admin/galleries/[id]
 * Fetch a single gallery by ID
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const gallery = await client.fetch(GALLERY_BY_ID_QUERY, { id })
    
    if (!gallery) {
      return NextResponse.json({ error: 'Gallery not found' }, { status: 404 })
    }
    
    return NextResponse.json({ gallery })
  } catch (error) {
    console.error('[API] Failed to fetch gallery:', error)
    return NextResponse.json(
      { error: 'Failed to fetch gallery' },
      { status: 500 }
    )
  }
}

/**
 * PUT /api/admin/galleries/[id]
 * Update a gallery
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await currentUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params
    const body = await request.json()
    const { title, description, visibility, coverPhoto } = body

    const updates: Record<string, any> = {}
    if (title !== undefined) {
      updates.title = title
      updates.slug = {
        current: title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, ''),
      }
    }
    if (description !== undefined) updates.description = description
    if (visibility !== undefined) updates.visibility = visibility
    if (coverPhoto !== undefined) {
      updates.coverPhoto = coverPhoto
        ? { _type: 'reference', _ref: coverPhoto }
        : null
    }

    const updatedGallery = await writeClient
      .patch(id)
      .set(updates)
      .commit()

    return NextResponse.json({ gallery: updatedGallery })
  } catch (error) {
    console.error('[API] Failed to update gallery:', error)
    return NextResponse.json(
      { error: 'Failed to update gallery' },
      { status: 500 }
    )
  }
}

/**
 * DELETE /api/admin/galleries/[id]
 * Delete a gallery
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
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
    console.error('[API] Failed to delete gallery:', error)
    return NextResponse.json(
      { error: 'Failed to delete gallery' },
      { status: 500 }
    )
  }
}
