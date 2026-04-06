'use client'

import { useState, useEffect, use } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { RoleSelector } from '@/components/admin/RoleSelector'
import { PermissionsGrid } from '@/components/admin/PermissionsGrid'
import { StatusToggle } from '@/components/admin/StatusToggle'

interface AdminProfile {
  _id: string
  userHandle: string
  email: string
  role: string
  status: string
  bio?: string
  permissions?: string[]
  lastLogin?: string
  createdAt?: string
  identity?: any
  avatar?: any
  portals?: any[]
  activityLog?: any[]
}

export default function ProfileEditorPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params)
  const router = useRouter()
  const isNew = resolvedParams.id === 'new'
  
  const [profile, setProfile] = useState<AdminProfile | null>(null)
  const [loading, setLoading] = useState(!isNew)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Form state
  const [userHandle, setUserHandle] = useState('')
  const [email, setEmail] = useState('')
  const [role, setRole] = useState('editor')
  const [status, setStatus] = useState('active')
  const [bio, setBio] = useState('')
  const [permissions, setPermissions] = useState<string[]>([])

  useEffect(() => {
    if (!isNew) {
      fetchProfile()
    }
  }, [resolvedParams.id, isNew])

  const fetchProfile = async () => {
    try {
      const res = await fetch(`/api/admin/profiles/${resolvedParams.id}`)
      const data = await res.json()
      
      if (!res.ok) {
        setError(data.error || 'Failed to load profile')
        return
      }

      const p = data.profile
      setProfile(p)
      setUserHandle(p.userHandle || '')
      setEmail(p.email || '')
      setRole(p.role || 'editor')
      setStatus(p.status || 'active')
      setBio(p.bio || '')
      setPermissions(p.permissions || [])
    } catch (err) {
      setError('Failed to load profile')
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    if (!userHandle || !email || !role) {
      setError('Please fill in all required fields')
      return
    }

    setSaving(true)
    setError(null)

    try {
      const url = isNew 
        ? '/api/admin/profiles' 
        : `/api/admin/profiles/${resolvedParams.id}`
      
      const method = isNew ? 'POST' : 'PUT'
      
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userHandle,
          email,
          role,
          status,
          bio,
          permissions,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Failed to save profile')
        return
      }

      router.push('/dashboard/profiles')
      router.refresh()
    } catch (err) {
      setError('Failed to save profile')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this admin profile?')) return

    setSaving(true)
    try {
      const res = await fetch(`/api/admin/profiles/${resolvedParams.id}`, {
        method: 'DELETE',
      })

      if (!res.ok) {
        const data = await res.json()
        setError(data.error || 'Failed to delete profile')
        return
      }

      router.push('/dashboard/profiles')
      router.refresh()
    } catch (err) {
      setError('Failed to delete profile')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="p-8 lg:p-12 max-w-4xl animate-pulse">
        <div className="h-8 bg-zinc-900 w-1/3 mb-8" />
        <div className="space-y-4">
          <div className="h-12 bg-zinc-900" />
          <div className="h-12 bg-zinc-900" />
          <div className="h-32 bg-zinc-900" />
        </div>
      </div>
    )
  }

  const studioUrl = process.env.NEXT_PUBLIC_SANITY_STUDIO_URL || '/studio'

  return (
    <div className="p-8 lg:p-12 max-w-4xl">
      {/* Header */}
      <header className="mb-12">
        <div className="flex items-center gap-4 mb-4">
          <Link
            href="/dashboard/profiles"
            className="text-[10px] text-zinc-600 hover:text-white transition-colors uppercase tracking-widest"
          >
            Back
          </Link>
          <span className="text-zinc-800">/</span>
          <p className="text-zinc-600 text-[10px] uppercase tracking-[0.4em]">
            {isNew ? 'New Admin' : 'Edit Profile'}
          </p>
        </div>
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-light tracking-tighter uppercase italic">
            {isNew ? 'Create Admin Profile' : userHandle || 'Admin Profile'}
          </h1>
          {!isNew && (
            <a
              href={`${studioUrl}/structure/adminProfile;${resolvedParams.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] text-zinc-500 hover:text-white transition-colors uppercase tracking-widest underline underline-offset-4"
            >
              Edit in Studio
            </a>
          )}
        </div>
      </header>

      {/* Error */}
      {error && (
        <div className="mb-8 p-4 border border-red-500/50 bg-red-500/10 text-red-400 text-sm">
          {error}
        </div>
      )}

      {/* Form */}
      <div className="space-y-8">
        {/* Identity Section */}
        <section className="border border-zinc-800 p-6 space-y-6">
          <h2 className="text-[10px] uppercase tracking-[0.3em] text-zinc-500 pb-4 border-b border-zinc-900">
            Identity
          </h2>
          
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-zinc-500">
                System Alias *
              </label>
              <input
                type="text"
                value={userHandle}
                onChange={(e) => setUserHandle(e.target.value)}
                placeholder="Enter handle..."
                className="w-full bg-transparent border border-zinc-800 px-4 py-3 text-sm focus:border-white focus:outline-none transition-colors"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-zinc-500">
                Email Address *
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@example.com"
                className="w-full bg-transparent border border-zinc-800 px-4 py-3 text-sm focus:border-white focus:outline-none transition-colors"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-widest text-zinc-500">
              Bio
            </label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Brief description..."
              rows={3}
              className="w-full bg-transparent border border-zinc-800 px-4 py-3 text-sm focus:border-white focus:outline-none transition-colors resize-none"
            />
          </div>
        </section>

        {/* Access Section */}
        <section className="border border-zinc-800 p-6 space-y-6">
          <h2 className="text-[10px] uppercase tracking-[0.3em] text-zinc-500 pb-4 border-b border-zinc-900">
            Access Control
          </h2>
          
          <RoleSelector value={role} onChange={setRole} />
          <StatusToggle value={status} onChange={setStatus} />
          <PermissionsGrid value={permissions} onChange={setPermissions} />
        </section>

        {/* Activity Section (read-only) */}
        {!isNew && profile?.activityLog && profile.activityLog.length > 0 && (
          <section className="border border-zinc-800 p-6">
            <h2 className="text-[10px] uppercase tracking-[0.3em] text-zinc-500 pb-4 border-b border-zinc-900 mb-4">
              Activity Log
            </h2>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {profile.activityLog.slice(0, 10).map((log: any, i: number) => (
                <div key={log._key || i} className="flex items-center justify-between py-2 border-b border-zinc-900 last:border-0">
                  <span className="text-[11px] text-zinc-400">{log.action}</span>
                  <span className="text-[9px] text-zinc-600">
                    {log.timestamp ? new Date(log.timestamp).toLocaleString() : ''}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Actions */}
        <div className="flex items-center justify-between pt-8 border-t border-zinc-800">
          <div>
            {!isNew && (
              <button
                type="button"
                onClick={handleDelete}
                disabled={saving}
                className="text-[10px] text-red-500 hover:text-red-400 transition-colors uppercase tracking-widest disabled:opacity-50"
              >
                Delete Profile
              </button>
            )}
          </div>
          
          <div className="flex items-center gap-4">
            <Link
              href="/dashboard/profiles"
              className="px-6 py-3 border border-zinc-800 text-[10px] uppercase tracking-widest hover:border-white transition-colors"
            >
              Cancel
            </Link>
            <button
              type="button"
              onClick={handleSave}
              disabled={saving}
              className="px-6 py-3 bg-white text-black text-[10px] uppercase tracking-widest hover:bg-zinc-200 transition-colors disabled:opacity-50"
            >
              {saving ? 'Saving...' : isNew ? 'Create Profile' : 'Save Changes'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
