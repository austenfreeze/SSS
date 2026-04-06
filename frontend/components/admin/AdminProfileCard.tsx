'use client'

import Link from 'next/link'

interface AdminProfile {
  _id: string
  userHandle: string
  email: string
  role: string
  status: string
  bio?: string
  identity?: {
    _id: string
    name: string
    slug: string
    image?: any
  }
  avatar?: {
    _id: string
    image?: {
      asset?: {
        url: string
      }
    }
  }
  portalsCount?: number
  managedPlatformsCount?: number
}

const roleColors: Record<string, string> = {
  superadmin: 'border-red-500/50 text-red-400',
  editor: 'border-blue-500/50 text-blue-400',
  moderator: 'border-yellow-500/50 text-yellow-400',
  contributor: 'border-green-500/50 text-green-400',
  viewer: 'border-zinc-500/50 text-zinc-400',
}

const roleLabels: Record<string, string> = {
  superadmin: 'Super Admin',
  editor: 'Editor',
  moderator: 'Moderator',
  contributor: 'Contributor',
  viewer: 'Viewer',
}

const statusColors: Record<string, string> = {
  active: 'bg-green-500',
  inactive: 'bg-zinc-500',
  suspended: 'bg-red-500',
  pending: 'bg-yellow-500',
}

export function AdminProfileCard({ profile }: { profile: AdminProfile }) {
  const avatarUrl = profile.avatar?.image?.asset?.url || profile.identity?.image?.asset?.url
  
  return (
    <Link
      href={`/dashboard/profiles/${profile._id}`}
      className="group block border border-zinc-800 bg-zinc-950 hover:border-zinc-700 transition-all p-6"
    >
      <div className="flex items-start gap-4">
        {/* Avatar */}
        <div className="relative">
          <div className="w-14 h-14 bg-zinc-900 border border-zinc-800 overflow-hidden">
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt={profile.userHandle}
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-zinc-700 text-lg font-bold">
                {profile.userHandle?.charAt(0).toUpperCase() || '?'}
              </div>
            )}
          </div>
          {/* Status indicator */}
          <div 
            className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-zinc-950 ${statusColors[profile.status] || 'bg-zinc-500'}`}
            title={profile.status}
          />
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-sm font-bold tracking-tight truncate">
              {profile.userHandle}
            </h3>
            <span className={`text-[8px] px-1.5 py-0.5 border rounded uppercase tracking-widest ${roleColors[profile.role] || 'border-zinc-500 text-zinc-400'}`}>
              {roleLabels[profile.role] || profile.role}
            </span>
          </div>
          
          <p className="text-[10px] text-zinc-500 truncate mb-2">
            {profile.identity?.name || profile.email}
          </p>

          {profile.bio && (
            <p className="text-[10px] text-zinc-600 line-clamp-2 mb-3">
              {profile.bio}
            </p>
          )}

          <div className="flex items-center gap-4 text-[9px] text-zinc-600">
            <span>{profile.portalsCount || 0} portals</span>
            <span>{profile.managedPlatformsCount || 0} platforms</span>
          </div>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-zinc-900 flex items-center justify-between">
        <span className="text-[9px] text-zinc-700 uppercase tracking-widest">
          {profile._id.slice(0, 12)}...
        </span>
        <span className="text-[10px] text-zinc-500 group-hover:text-white transition-colors uppercase tracking-widest">
          View Profile
        </span>
      </div>
    </Link>
  )
}

export function AdminProfileCardSkeleton() {
  return (
    <div className="border border-zinc-800 bg-zinc-950 p-6 animate-pulse">
      <div className="flex items-start gap-4">
        <div className="w-14 h-14 bg-zinc-900" />
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-zinc-900 w-1/2" />
          <div className="h-3 bg-zinc-900 w-3/4" />
          <div className="h-3 bg-zinc-900 w-1/4" />
        </div>
      </div>
    </div>
  )
}
