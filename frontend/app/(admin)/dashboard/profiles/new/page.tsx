'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { RoleSelector } from '@/components/admin/RoleSelector'
import { PermissionsGrid, type Permission } from '@/components/admin/PermissionsGrid'

const DEFAULT_PERMISSIONS: Permission[] = [
  { key: 'canEditContent', label: 'Edit Content', description: 'Create and edit articles, posts, and media', enabled: true },
  { key: 'canPublish', label: 'Publish', description: 'Publish content to the live site', enabled: false },
  { key: 'canManageMedia', label: 'Manage Media', description: 'Upload and organize photos and galleries', enabled: true },
  { key: 'canManageUsers', label: 'Manage Users', description: 'Add and remove admin users', enabled: false },
  { key: 'canAccessAnalytics', label: 'Access Analytics', description: 'View site statistics and reports', enabled: true },
  { key: 'canManageSettings', label: 'Manage Settings', description: 'Change site configuration', enabled: false },
]

export default function NewProfilePage() {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Form state
  const [displayName, setDisplayName] = useState('')
  const [email, setEmail] = useState('')
  const [role, setRole] = useState<'superadmin' | 'editor' | 'moderator'>('editor')
  const [bio, setBio] = useState('')
  const [permissions, setPermissions] = useState<Permission[]>(DEFAULT_PERMISSIONS)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError(null)

    const payload = {
      displayName,
      email,
      role,
      bio,
      status: 'active',
      permissions: permissions.reduce((acc, p) => ({
        ...acc,
        [p.key]: p.enabled
      }), {}),
    }

    try {
      const res = await fetch('/api/admin/profiles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Failed to create profile')
      }

      const data = await res.json()
      router.push(`/dashboard/profiles/${data._id}`)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create profile')
    } finally {
      setSaving(false)
    }
  }

  function handleRoleChange(newRole: 'superadmin' | 'editor' | 'moderator') {
    setRole(newRole)
    
    // Auto-adjust permissions based on role
    if (newRole === 'superadmin') {
      setPermissions(permissions.map(p => ({ ...p, enabled: true })))
    } else if (newRole === 'moderator') {
      setPermissions(permissions.map(p => ({
        ...p,
        enabled: ['canEditContent', 'canAccessAnalytics'].includes(p.key)
      })))
    } else {
      setPermissions(permissions.map(p => ({
        ...p,
        enabled: ['canEditContent', 'canManageMedia', 'canAccessAnalytics'].includes(p.key)
      })))
    }
  }

  return (
    <div className="p-6 md:p-8 max-w-4xl">
      {/* Header */}
      <div className="mb-8">
        <Link 
          href="/dashboard/profiles" 
          className="text-sm text-neutral-400 hover:text-white mb-2 inline-block"
        >
          &larr; Back to Profiles
        </Link>
        <h1 className="text-2xl md:text-3xl font-bold text-white">
          Create Admin Profile
        </h1>
        <p className="text-neutral-400 mt-1">
          Add a new administrator to the team
        </p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-900/30 border border-red-800 rounded text-red-300">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Info */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Basic Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-1">
                Display Name *
              </label>
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                required
                className="w-full px-4 py-2 bg-neutral-800 border border-neutral-700 rounded text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-white/20"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-1">
                Email *
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 bg-neutral-800 border border-neutral-700 rounded text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-white/20"
                placeholder="john@example.com"
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-neutral-300 mb-1">
              Bio
            </label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={3}
              className="w-full px-4 py-2 bg-neutral-800 border border-neutral-700 rounded text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-white/20 resize-none"
              placeholder="Brief description of this admin..."
            />
          </div>
        </div>

        {/* Role Selection */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Role</h2>
          <RoleSelector value={role} onChange={handleRoleChange} />
        </div>

        {/* Permissions */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Permissions</h2>
          <PermissionsGrid
            permissions={permissions}
            onChange={setPermissions}
            disabled={role === 'superadmin'}
          />
          {role === 'superadmin' && (
            <p className="text-sm text-neutral-500 mt-3">
              Superadmins have all permissions enabled by default.
            </p>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 pt-4">
          <Link
            href="/dashboard/profiles"
            className="px-6 py-2 border border-neutral-700 text-neutral-300 rounded hover:bg-neutral-800 transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={saving || !displayName || !email}
            className="px-6 py-2 bg-white text-black rounded font-medium hover:bg-neutral-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {saving ? 'Creating...' : 'Create Profile'}
          </button>
        </div>
      </form>
    </div>
  )
}
