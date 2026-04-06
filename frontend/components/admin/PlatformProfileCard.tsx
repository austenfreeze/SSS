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

interface PlatformProfileCardProps {
  profile: any
  platform: string
}

const platformIcons: Record<string, IconType> = {
  spotify: SiSpotify,
  facebook: SiFacebook,
  instagram: SiInstagram,
  youtube: SiYoutube,
  twitter: SiX,
  tiktok: SiTiktok,
}

function formatNumber(num: number | undefined): string {
  if (!num) return '0'
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
  return num.toString()
}

export function PlatformProfileCard({ profile, platform }: PlatformProfileCardProps) {
  const IconComponent = platformIcons[platform] || SiInstagram
  const avatarUrl = profile.profilePhoto?.image?.asset?.url
  
  // Get the display name based on platform
  const displayName = profile.profileName || profile.channelName || profile.displayName || 'Unnamed Profile'
  const handle = profile.username || profile.handle || profile.customUrl
  const followers = profile.followersCount || profile.subscriberCount || 0
  const posts = profile.postsCount || profile.videoCount || profile.tweetCount || 0

  const studioUrl = process.env.NEXT_PUBLIC_SANITY_STUDIO_URL || '/studio'
  const schemaType = `${platform}Profile`

  return (
    <div className="group border border-zinc-800 bg-zinc-950 hover:border-zinc-700 transition-all">
      <div className="p-5">
        <div className="flex items-start gap-4">
          {/* Avatar */}
          <div className="relative">
            <div className="w-12 h-12 bg-zinc-900 border border-zinc-800 overflow-hidden">
              {avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt={displayName}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <IconComponent className="w-5 h-5 text-zinc-700" />
                </div>
              )}
            </div>
            {profile.isVerified && (
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-bold tracking-tight truncate mb-1">
              {displayName}
            </h3>
            {handle && (
              <p className="text-[10px] text-zinc-500 truncate">
                @{handle}
              </p>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mt-4 pt-4 border-t border-zinc-900">
          <div>
            <p className="text-sm font-bold">{formatNumber(followers)}</p>
            <p className="text-[8px] text-zinc-600 uppercase tracking-wider">
              {platform === 'youtube' ? 'Subs' : 'Followers'}
            </p>
          </div>
          <div>
            <p className="text-sm font-bold">{formatNumber(posts)}</p>
            <p className="text-[8px] text-zinc-600 uppercase tracking-wider">
              {platform === 'youtube' ? 'Videos' : platform === 'twitter' ? 'Tweets' : 'Posts'}
            </p>
          </div>
          {profile.likesCount !== undefined && (
            <div>
              <p className="text-sm font-bold">{formatNumber(profile.likesCount)}</p>
              <p className="text-[8px] text-zinc-600 uppercase tracking-wider">Likes</p>
            </div>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="px-5 py-3 border-t border-zinc-900 flex items-center justify-between bg-zinc-950/50">
        <span className="text-[8px] text-zinc-700 uppercase tracking-wider">
          {profile._id?.slice(0, 12)}...
        </span>
        <div className="flex items-center gap-3">
          {profile.url && (
            <a
              href={profile.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[9px] text-zinc-600 hover:text-white transition-colors uppercase tracking-wider"
            >
              Visit
            </a>
          )}
          <a
            href={`${studioUrl}/structure/${schemaType};${profile._id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[9px] text-zinc-500 hover:text-white transition-colors uppercase tracking-wider"
          >
            Edit
          </a>
        </div>
      </div>
    </div>
  )
}

export function PlatformProfileCardSkeleton() {
  return (
    <div className="border border-zinc-800 bg-zinc-950 animate-pulse">
      <div className="p-5">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-zinc-900" />
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-zinc-900 w-2/3" />
            <div className="h-3 bg-zinc-900 w-1/2" />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3 mt-4 pt-4 border-t border-zinc-900">
          <div className="h-8 bg-zinc-900" />
          <div className="h-8 bg-zinc-900" />
          <div className="h-8 bg-zinc-900" />
        </div>
      </div>
    </div>
  )
}
