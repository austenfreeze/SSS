'use client'

import Link from 'next/link'
import { 
  SiSpotify, 
  SiFacebook, 
  SiInstagram, 
  SiYoutube, 
  SiTiktok 
} from 'react-icons/si'
import { SiX } from 'react-icons/si'
import type { IconType } from 'react-icons'

interface SocialPlatformCardProps {
  platform: string
  profiles: any[]
  stats?: {
    totalFollowers?: number
    totalPosts?: number
  }
}

const platformConfig: Record<string, { 
  icon: IconType
  label: string
  color: string
  gradient: string
}> = {
  spotify: {
    icon: SiSpotify,
    label: 'Spotify',
    color: 'text-green-500',
    gradient: 'from-green-500/20 to-transparent',
  },
  facebook: {
    icon: SiFacebook,
    label: 'Facebook',
    color: 'text-blue-600',
    gradient: 'from-blue-600/20 to-transparent',
  },
  instagram: {
    icon: SiInstagram,
    label: 'Instagram',
    color: 'text-pink-500',
    gradient: 'from-pink-500/20 to-transparent',
  },
  youtube: {
    icon: SiYoutube,
    label: 'YouTube',
    color: 'text-red-500',
    gradient: 'from-red-500/20 to-transparent',
  },
  twitter: {
    icon: SiX,
    label: 'Twitter/X',
    color: 'text-white',
    gradient: 'from-zinc-500/20 to-transparent',
  },
  tiktok: {
    icon: SiTiktok,
    label: 'TikTok',
    color: 'text-cyan-400',
    gradient: 'from-cyan-400/20 to-transparent',
  },
}

function formatNumber(num: number | undefined): string {
  if (!num) return '0'
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
  return num.toString()
}

export function SocialPlatformCard({ platform, profiles, stats }: SocialPlatformCardProps) {
  const config = platformConfig[platform]
  if (!config) return null

  const IconComponent = config.icon
  const profileCount = profiles?.length || 0
  const hasProfiles = profileCount > 0

  return (
    <Link
      href={`/dashboard/social/${platform}`}
      className="group block border border-zinc-800 bg-zinc-950 hover:border-zinc-700 transition-all overflow-hidden"
    >
      {/* Header with gradient */}
      <div className={`h-16 bg-gradient-to-b ${config.gradient} flex items-center justify-center`}>
        <IconComponent className={`w-8 h-8 ${config.color} group-hover:scale-110 transition-transform`} />
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold tracking-tight">{config.label}</h3>
          <span className={`text-[9px] px-2 py-0.5 border rounded-full ${hasProfiles ? 'border-green-500/50 text-green-400' : 'border-zinc-700 text-zinc-600'}`}>
            {hasProfiles ? 'Connected' : 'Not Set'}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <div>
            <p className="text-lg font-bold">{profileCount}</p>
            <p className="text-[9px] text-zinc-600 uppercase tracking-wider">Profiles</p>
          </div>
          {stats?.totalFollowers !== undefined && (
            <div>
              <p className="text-lg font-bold">{formatNumber(stats.totalFollowers)}</p>
              <p className="text-[9px] text-zinc-600 uppercase tracking-wider">Followers</p>
            </div>
          )}
        </div>

        <div className="pt-3 border-t border-zinc-900">
          <span className="text-[10px] text-zinc-500 group-hover:text-white transition-colors uppercase tracking-widest">
            Manage Platform
          </span>
        </div>
      </div>
    </Link>
  )
}

export function SocialPlatformCardSkeleton() {
  return (
    <div className="border border-zinc-800 bg-zinc-950 overflow-hidden animate-pulse">
      <div className="h-16 bg-zinc-900" />
      <div className="p-4 space-y-3">
        <div className="h-4 bg-zinc-900 w-1/2" />
        <div className="h-8 bg-zinc-900 w-full" />
        <div className="h-3 bg-zinc-900 w-1/3" />
      </div>
    </div>
  )
}
