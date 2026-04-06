import { notFound } from 'next/navigation'
import Link from 'next/link'
import { client } from '@/src/sanity/client'
import { groq } from 'next-sanity'
import { PlatformProfileCard } from '@/components/admin/PlatformProfileCard'
import { 
  SiSpotify, 
  SiFacebook, 
  SiInstagram, 
  SiYoutube, 
  SiTiktok 
} from 'react-icons/si'
import { SiX } from 'react-icons/si'

export const dynamic = 'force-dynamic'

const platformConfig: Record<string, {
  label: string
  schemaType: string
  icon: any
  color: string
  description: string
}> = {
  instagram: {
    label: 'Instagram',
    schemaType: 'instagramProfile',
    icon: SiInstagram,
    color: 'text-pink-500',
    description: 'Manage Instagram profiles and archived posts, stories, and reels.',
  },
  youtube: {
    label: 'YouTube',
    schemaType: 'youtubeProfile',
    icon: SiYoutube,
    color: 'text-red-500',
    description: 'Manage YouTube channels, videos, and playlists.',
  },
  twitter: {
    label: 'Twitter/X',
    schemaType: 'twitterProfile',
    icon: SiX,
    color: 'text-white',
    description: 'Manage Twitter/X profiles and archived tweets.',
  },
  tiktok: {
    label: 'TikTok',
    schemaType: 'tiktokProfile',
    icon: SiTiktok,
    color: 'text-cyan-400',
    description: 'Manage TikTok profiles and archived videos.',
  },
  spotify: {
    label: 'Spotify',
    schemaType: 'spotifyProfile',
    icon: SiSpotify,
    color: 'text-green-500',
    description: 'Manage Spotify profiles, playlists, and music archives.',
  },
  facebook: {
    label: 'Facebook',
    schemaType: 'facebookProfile',
    icon: SiFacebook,
    color: 'text-blue-600',
    description: 'Manage Facebook profiles and archived posts.',
  },
}

export default async function PlatformPage({ 
  params 
}: { 
  params: Promise<{ platform: string }> 
}) {
  const { platform } = await params
  const config = platformConfig[platform]

  if (!config) {
    notFound()
  }

  const profiles = await client.fetch(
    groq`*[_type == $type] | order(_createdAt desc) {
      _id,
      _type,
      ...,
      "profilePhoto": profilePhoto->{ 
        image { asset->{ url } }
      }
    }`,
    { type: config.schemaType }
  )

  const IconComponent = config.icon
  const studioUrl = process.env.NEXT_PUBLIC_SANITY_STUDIO_URL || '/studio'

  // Calculate stats
  const totalFollowers = profiles.reduce((sum: number, p: any) => {
    return sum + (p.followersCount || p.subscriberCount || 0)
  }, 0)

  return (
    <div className="p-8 lg:p-12 max-w-6xl">
      {/* Header */}
      <header className="mb-12">
        <div className="flex items-center gap-4 mb-4">
          <Link
            href="/dashboard/social"
            className="text-[10px] text-zinc-600 hover:text-white transition-colors uppercase tracking-widest"
          >
            Social Portals
          </Link>
          <span className="text-zinc-800">/</span>
          <p className="text-zinc-600 text-[10px] uppercase tracking-[0.4em]">
            {config.label}
          </p>
        </div>
        
        <div className="flex items-center gap-4 mb-4">
          <IconComponent className={`w-8 h-8 ${config.color}`} />
          <h1 className="text-4xl font-light tracking-tighter uppercase italic">
            {config.label}
          </h1>
        </div>
        
        <p className="text-zinc-500 text-sm max-w-xl">
          {config.description}
        </p>
      </header>

      {/* Stats Bar */}
      <div className="grid grid-cols-3 gap-4 mb-12 border border-zinc-800 p-6">
        <div>
          <p className="text-2xl font-bold">{profiles.length}</p>
          <p className="text-[9px] text-zinc-600 uppercase tracking-wider">Profiles</p>
        </div>
        <div>
          <p className="text-2xl font-bold">
            {totalFollowers >= 1000000 
              ? `${(totalFollowers / 1000000).toFixed(1)}M` 
              : totalFollowers >= 1000 
                ? `${(totalFollowers / 1000).toFixed(1)}K` 
                : totalFollowers}
          </p>
          <p className="text-[9px] text-zinc-600 uppercase tracking-wider">
            {platform === 'youtube' ? 'Subscribers' : 'Followers'}
          </p>
        </div>
        <div>
          <p className="text-2xl font-bold">
            {profiles.filter((p: any) => p.isVerified).length}
          </p>
          <p className="text-[9px] text-zinc-600 uppercase tracking-wider">Verified</p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-[10px] uppercase tracking-[0.3em] text-zinc-500">
          All Profiles
        </h2>
        <a
          href={`${studioUrl}/structure/${config.schemaType}`}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 bg-white text-black text-[10px] uppercase tracking-widest hover:bg-zinc-200 transition-colors"
        >
          Add Profile in Studio
        </a>
      </div>

      {/* Profiles Grid */}
      {profiles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {profiles.map((profile: any) => (
            <PlatformProfileCard 
              key={profile._id} 
              profile={profile} 
              platform={platform} 
            />
          ))}
        </div>
      ) : (
        <div className="py-20 border border-dashed border-zinc-900 text-center">
          <IconComponent className={`w-12 h-12 ${config.color} opacity-30 mx-auto mb-4`} />
          <p className="text-zinc-600 italic mb-4">
            No {config.label} profiles found.
          </p>
          <a
            href={`${studioUrl}/structure/${config.schemaType}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] text-white underline underline-offset-4 uppercase tracking-widest"
          >
            Create First Profile
          </a>
        </div>
      )}

      {/* Archive Section */}
      {platform !== 'spotify' && (
        <section className="mt-12 border border-zinc-800 p-6">
          <h2 className="text-[10px] uppercase tracking-[0.3em] text-zinc-500 mb-4">
            Archive Management
          </h2>
          <div className="flex flex-wrap gap-3">
            <a
              href={`${studioUrl}/structure/${platform}Archive`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 border border-zinc-800 text-[10px] uppercase tracking-widest hover:border-white hover:text-white transition-colors text-zinc-500"
            >
              View Archives
            </a>
            <button className="px-4 py-2 border border-zinc-800 text-[10px] uppercase tracking-widest hover:border-white hover:text-white transition-colors text-zinc-500">
              Import Archive Data
            </button>
          </div>
        </section>
      )}
    </div>
  )
}
