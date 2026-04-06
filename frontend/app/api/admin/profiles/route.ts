import { NextRequest, NextResponse } from 'next/server'
import { client } from '@/src/sanity/client'
import { writeClient, generateId } from '@/src/sanity/writeClient'
import { ADMIN_PROFILES_QUERY } from '@/src/sanity/adminQueries'
import { currentUser } from '@clerk/nextjs/server'

/**
 * GET /api/admin/profiles
 * Fetch all admin profiles
 */
export async function GET() {
  try {
    const profiles = await client.fetch(ADMIN_PROFILES_QUERY)
    return NextResponse.json({ profiles })
  } catch (error) {
    console.error('[API] Failed to fetch admin profiles:', error)
    return NextResponse.json(
      { error: 'Failed to fetch admin profiles' },
      { status: 500 }
    )
  }
}

/**
 * POST /api/admin/profiles
 * Create a new admin profile
 */
export async function POST(request: NextRequest) {
  try {
    const user = await currentUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { userHandle, email, role, bio, permissions, status } = body

    if (!userHandle || !email || !role) {
      return NextResponse.json(
        { error: 'Missing required fields: userHandle, email, role' },
        { status: 400 }
      )
    }

    // Check if email already exists
    const existing = await client.fetch(
      `*[_type == "adminProfile" && email == $email][0]._id`,
      { email }
    )
    if (existing) {
      return NextResponse.json(
        { error: 'An admin profile with this email already exists' },
        { status: 409 }
      )
    }

    const newProfile = await writeClient.create({
      _id: generateId('admin'),
      _type: 'adminProfile',
      userHandle,
      email,
      role,
      bio: bio || '',
      permissions: permissions || [],
      status: status || 'active',
      createdAt: new Date().toISOString(),
      activityLog: [
        {
          _key: generateId('log'),
          action: 'Profile created',
          timestamp: new Date().toISOString(),
          details: `Created by ${user.emailAddresses[0]?.emailAddress || user.id}`,
        },
      ],
    })

    return NextResponse.json({ profile: newProfile }, { status: 201 })
  } catch (error) {
    console.error('[API] Failed to create admin profile:', error)
    return NextResponse.json(
      { error: 'Failed to create admin profile' },
      { status: 500 }
    )
  }
}
