import { client } from '@/src/sanity/client'
import { ALL_SOCIAL_PROFILES_QUERY } from '@/src/sanity/adminQueries'
import { SocialPlatformCard } from '@/components/admin/SocialPlatformCard'

export const dynamic = 'force-dynamic'

export default async function SocialPlatformsPage() {
  const profiles = await client.fetch(ALL_SOCIAL_PROFILES_QUERY)

  const platforms = [
    { key: 'instagram', data: profiles.instagram },
    { key: 'youtube', data: profiles.youtube },
    { key: 'twitter', data: profiles.twitter },
    { key: 'tiktok', data: profiles.tiktok },
    { key: 'spotify', data: profiles.spotify },
    { key: 'facebook', data: profiles.facebook },
  ]

  // Calculate total followers across all platforms
  const totalFollowers = platforms.reduce((acc, p) => {
    const platformFollowers = p.data?.reduce((sum: number, profile: any) => {
      return sum + (profile.followersCount || profile.subscriberCount || 0)
    }, 0) || 0
    return acc + platformFollowers
  }, 0)

  const totalProfiles = platforms.reduce((acc, p) => acc + (p.data?.length || 0), 0)
  const connectedPlatforms = platforms.filter(p => p.data?.length > 0).length

  return (
    <div className="p-8 lg:p-12 max-w-6xl">
      {/* Header */}
      <header className="mb-12">
        <p className="text-zinc-600 text-[10px] uppercase tracking-[0.4em] mb-2">
          Platform Management
        </p>
        <h1 className="text-4xl font-light tracking-tighter uppercase italic mb-4">
          Social Portals
        </h1>
        <p className="text-zinc-500 text-sm max-w-xl">
          Unified management of all social media platform profiles and archives. 
          Connect profiles to enable cross-platform content management and archival.
        </p>
      </header>

      {/* Stats Bar */}
      <div className="grid grid-cols-4 gap-4 mb-12 border border-zinc-800 p-6">
        <div>
          <p className="text-2xl font-bold">{connectedPlatforms}/6</p>
          <p className="text-[9px] text-zinc-600 uppercase tracking-wider">Platforms Active</p>
        </div>
        <div>
          <p className="text-2xl font-bold">{totalProfiles}</p>
          <p className="text-[9px] text-zinc-600 uppercase tracking-wider">Total Profiles</p>
        </div>
        <div>
          <p className="text-2xl font-bold">
            {totalFollowers >= 1000000 
              ? `${(totalFollowers / 1000000).toFixed(1)}M` 
              : totalFollowers >= 1000 
                ? `${(totalFollowers / 1000).toFixed(1)}K` 
                : totalFollowers}
          </p>
          <p className="text-[9px] text-zinc-600 uppercase tracking-wider">Total Reach</p>
        </div>
        <div>
          <p className="text-2xl font-bold">6</p>
          <p className="text-[9px] text-zinc-600 uppercase tracking-wider">Integrations</p>
        </div>
      </div>

      {/* Platform Grid */}
      <section>
        <div className="flex items-center gap-4 mb-6">
          <h2 className="text-[10px] uppercase tracking-[0.3em] text-zinc-500">
            All Platforms
          </h2>
          <div className="flex-1 h-px bg-zinc-900" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {platforms.map((platform) => {
            const totalPlatformFollowers = platform.data?.reduce((sum: number, p: any) => {
              return sum + (p.followersCount || p.subscriberCount || 0)
            }, 0) || 0

            return (
              <SocialPlatformCard
                key={platform.key}
                platform={platform.key}
                profiles={platform.data || []}
                stats={{ totalFollowers: totalPlatformFollowers }}
              />
            )
          })}
        </div>
      </section>

      {/* Quick Actions */}
      <section className="mt-12 border border-zinc-800 p-6">
        <h2 className="text-[10px] uppercase tracking-[0.3em] text-zinc-500 mb-4">
          Quick Actions
        </h2>
        <div className="flex flex-wrap gap-3">
          <a
            href={`${process.env.NEXT_PUBLIC_SANITY_STUDIO_URL || '/studio'}/structure`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 border border-zinc-800 text-[10px] uppercase tracking-widest hover:border-white hover:text-white transition-colors"
          >
            Open Studio
          </a>
          <button className="px-4 py-2 border border-zinc-800 text-[10px] uppercase tracking-widest hover:border-white hover:text-white transition-colors text-zinc-500">
            Sync All Profiles
          </button>
          <button className="px-4 py-2 border border-zinc-800 text-[10px] uppercase tracking-widest hover:border-white hover:text-white transition-colors text-zinc-500">
            Export Data
          </button>
        </div>
      </section>
    </div>
  )
}
