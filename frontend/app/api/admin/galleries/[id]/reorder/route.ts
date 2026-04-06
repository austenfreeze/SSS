import { NextRequest, NextResponse } from 'next/server'
import { writeClient, generateId } from '@/src/sanity/writeClient'
import { currentUser } from '@clerk/nextjs/server'

/**
 * POST /api/admin/galleries/[id]/reorder
 * Reorder photos within a gallery
 */
export async function POST(
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
    const { photoIds } = body

    if (!Array.isArray(photoIds)) {
      return NextResponse.json(
        { error: 'photoIds must be an array of photo IDs' },
        { status: 400 }
      )
    }

    // Convert array of IDs to array of references with unique keys
    const photos = photoIds.map((photoId: string) => ({
      _key: generateId('ref'),
      _type: 'reference',
      _ref: photoId,
    }))

    // Update the gallery with the new photo order
    const updatedGallery = await writeClient
      .patch(id)
      .set({ 
        photos,
        'metadata.photoCount': photos.length,
        'metadata.updatedAt': new Date().toISOString(),
      })
      .commit()

    return NextResponse.json({ 
      success: true, 
      gallery: updatedGallery 
    })
  } catch (error) {
    console.error('[API] Failed to reorder gallery photos:', error)
    return NextResponse.json(
      { error: 'Failed to reorder gallery photos' },
      { status: 500 }
    )
  }
}
