import { NextRequest, NextResponse } from 'next/server'
import { client } from '@/src/sanity/client'
import { writeClient, generateId } from '@/src/sanity/writeClient'
import { ADMIN_PROFILE_BY_ID_QUERY } from '@/src/sanity/adminQueries'
import { currentUser } from '@clerk/nextjs/server'

/**
 * GET /api/admin/profiles/[id]
 * Fetch a single admin profile by ID
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const profile = await client.fetch(ADMIN_PROFILE_BY_ID_QUERY, { id })
    
    if (!profile) {
      return NextResponse.json({ error: 'Profile not found' }, { status: 404 })
    }
    
    return NextResponse.json({ profile })
  } catch (error) {
    console.error('[API] Failed to fetch admin profile:', error)
    return NextResponse.json(
      { error: 'Failed to fetch admin profile' },
      { status: 500 }
    )
  }
}

/**
 * PUT /api/admin/profiles/[id]
 * Update an admin profile
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
    const { userHandle, email, role, bio, permissions, status, portals } = body

    // Build the update object
    const updates: Record<string, any> = {}
    if (userHandle !== undefined) updates.userHandle = userHandle
    if (email !== undefined) updates.email = email
    if (role !== undefined) updates.role = role
    if (bio !== undefined) updates.bio = bio
    if (permissions !== undefined) updates.permissions = permissions
    if (status !== undefined) updates.status = status
    if (portals !== undefined) updates.portals = portals

    // Update the profile
    const updatedProfile = await writeClient
      .patch(id)
      .set(updates)
      .commit()

    // Log the activity
    await writeClient
      .patch(id)
      .setIfMissing({ activityLog: [] })
      .append('activityLog', [
        {
          _key: generateId('log'),
          action: 'Profile updated',
          timestamp: new Date().toISOString(),
          details: `Updated fields: ${Object.keys(updates).join(', ')}`,
        },
      ])
      .commit()

    return NextResponse.json({ profile: updatedProfile })
  } catch (error) {
    console.error('[API] Failed to update admin profile:', error)
    return NextResponse.json(
      { error: 'Failed to update admin profile' },
      { status: 500 }
    )
  }
}

/**
 * DELETE /api/admin/profiles/[id]
 * Delete an admin profile
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

    // Check if this is the last superadmin
    const superadmins = await client.fetch(
      `*[_type == "adminProfile" && role == "superadmin"]._id`
    )
    const profile = await client.fetch(
      `*[_type == "adminProfile" && _id == $id][0]{ role }`,
      { id }
    )

    if (profile?.role === 'superadmin' && superadmins.length <= 1) {
      return NextResponse.json(
        { error: 'Cannot delete the last superadmin' },
        { status: 403 }
      )
    }

    await writeClient.delete(id)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[API] Failed to delete admin profile:', error)
    return NextResponse.json(
      { error: 'Failed to delete admin profile' },
      { status: 500 }
    )
  }
}
