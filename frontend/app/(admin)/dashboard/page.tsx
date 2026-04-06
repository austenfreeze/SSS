import { client } from "../../../src/sanity/client";
import Link from "next/link";
import { getStudioUrl } from "@/components/admin/StudioLink";

async function getStats() {
  const stats = await client.fetch(`{
    "admins": count(*[_type == "adminProfile"]),
    "photos": count(*[_type == "photo"]),
    "galleries": count(*[_type == "gallery"]),
    "articles": count(*[_type == "article"]),
    "spotifyProfiles": count(*[_type == "spotifyProfile"]),
    "instagramProfiles": count(*[_type == "instagramProfile"]),
    "youtubeProfiles": count(*[_type == "youtubeProfile"]),
    "twitterProfiles": count(*[_type == "twitterProfile"]),
    "tiktokProfiles": count(*[_type == "tiktokProfile"]),
    "facebookProfiles": count(*[_type == "facebookProfile"])
  }`);
  return stats;
}

async function getRecentActivity() {
  const activity = await client.fetch(`
    *[_type in ["photo", "gallery", "article", "adminProfile"]] | order(_updatedAt desc) [0...5] {
      _id,
      _type,
      _updatedAt,
      "title": coalesce(title, name, displayName, "Untitled")
    }
  `);
  return activity;
}

async function getRecentPhotos() {
  const photos = await client.fetch(`
    *[_type == "photo"] | order(_createdAt desc) [0...4] {
      _id,
      title,
      photoCaption {
        narrative,
        intent
      },
      "imageUrl": image.asset->url
    }
  `);
  return photos;
}

export default async function AdminDashboard() {
  const [stats, activity, photos] = await Promise.all([
    getStats(),
    getRecentActivity(),
    getRecentPhotos()
  ]);

  const socialPlatforms = [
    { name: 'Spotify', count: stats.spotifyProfiles, color: 'bg-green-500', href: '/dashboard/social/spotify' },
    { name: 'Instagram', count: stats.instagramProfiles, color: 'bg-pink-500', href: '/dashboard/social/instagram' },
    { name: 'YouTube', count: stats.youtubeProfiles, color: 'bg-red-500', href: '/dashboard/social/youtube' },
    { name: 'Twitter/X', count: stats.twitterProfiles, color: 'bg-sky-500', href: '/dashboard/social/twitter' },
    { name: 'TikTok', count: stats.tiktokProfiles, color: 'bg-neutral-100', href: '/dashboard/social/tiktok' },
    { name: 'Facebook', count: stats.facebookProfiles, color: 'bg-blue-500', href: '/dashboard/social/facebook' },
  ];

  return (
    <div className="p-6 md:p-8 lg:p-12 max-w-7xl">
      {/* Header */}
      <header className="mb-12">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <p className="text-neutral-500 text-[10px] uppercase tracking-[0.4em] mb-2">
              Control Center / {new Date().toLocaleDateString()}
            </p>
            <h1 className="text-3xl md:text-4xl font-light tracking-tighter uppercase">
              Admin Dashboard
            </h1>
          </div>
          <a
            href={getStudioUrl('adminProfile')}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-neutral-400 hover:text-white transition-colors"
          >
            Open Sanity Studio &rarr;
          </a>
        </div>
      </header>

      {/* Stats Grid */}
      <section className="mb-12">
        <h2 className="text-xs uppercase tracking-widest text-neutral-500 mb-4">Overview</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link href="/dashboard/profiles" className="group">
            <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-4 hover:border-neutral-700 transition-colors">
              <p className="text-3xl font-bold text-white">{stats.admins}</p>
              <p className="text-sm text-neutral-400 group-hover:text-white transition-colors">Admin Profiles</p>
            </div>
          </Link>
          <Link href="/dashboard/galleries" className="group">
            <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-4 hover:border-neutral-700 transition-colors">
              <p className="text-3xl font-bold text-white">{stats.galleries}</p>
              <p className="text-sm text-neutral-400 group-hover:text-white transition-colors">Galleries</p>
            </div>
          </Link>
          <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-4">
            <p className="text-3xl font-bold text-white">{stats.photos}</p>
            <p className="text-sm text-neutral-400">Total Photos</p>
          </div>
          <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-4">
            <p className="text-3xl font-bold text-white">{stats.articles}</p>
            <p className="text-sm text-neutral-400">Articles</p>
          </div>
        </div>
      </section>

      {/* Social Platforms */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xs uppercase tracking-widest text-neutral-500">Social Platforms</h2>
          <Link href="/dashboard/social" className="text-xs text-neutral-500 hover:text-white transition-colors">
            View All &rarr;
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {socialPlatforms.map((platform) => (
            <Link key={platform.name} href={platform.href} className="group">
              <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-4 hover:border-neutral-700 transition-colors">
                <div className="flex items-center gap-2 mb-2">
                  <span className={`w-2 h-2 rounded-full ${platform.color}`}></span>
                  <span className="text-sm text-neutral-300 group-hover:text-white transition-colors">
                    {platform.name}
                  </span>
                </div>
                <p className="text-2xl font-bold text-white">{platform.count}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <section className="lg:col-span-1">
          <h2 className="text-xs uppercase tracking-widest text-neutral-500 mb-4">Recent Activity</h2>
          <div className="bg-neutral-900 border border-neutral-800 rounded-lg divide-y divide-neutral-800">
            {activity.length > 0 ? (
              activity.map((item: any) => (
                <div key={item._id} className="p-4 hover:bg-neutral-800/50 transition-colors">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="text-sm text-white truncate">{item.title}</p>
                      <p className="text-xs text-neutral-500 capitalize">{item._type.replace(/([A-Z])/g, ' $1').trim()}</p>
                    </div>
                    <span className="text-[10px] text-neutral-600 whitespace-nowrap">
                      {new Date(item._updatedAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-neutral-600 text-sm">
                No recent activity
              </div>
            )}
          </div>
        </section>

        {/* Recent Photos */}
        <section className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xs uppercase tracking-widest text-neutral-500">Recent Photos</h2>
            <Link href="/dashboard/galleries" className="text-xs text-neutral-500 hover:text-white transition-colors">
              Manage Galleries &rarr;
            </Link>
          </div>
          
          {photos.length > 0 ? (
            <div className="grid grid-cols-2 gap-4">
              {photos.map((photo: any) => (
                <a 
                  key={photo._id} 
                  href={getStudioUrl('photo', photo._id)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group"
                >
                  <div className="bg-neutral-900 border border-neutral-800 rounded-lg overflow-hidden hover:border-neutral-700 transition-colors">
                    <div className="aspect-video bg-neutral-800 relative">
                      {photo.imageUrl ? (
                        <img 
                          src={photo.imageUrl} 
                          alt={photo.title || 'Photo'} 
                          className="object-cover w-full h-full grayscale group-hover:grayscale-0 transition-all duration-500" 
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full text-neutral-700 text-xs">
                          No Image
                        </div>
                      )}
                    </div>
                    <div className="p-3">
                      <p className="text-sm text-white truncate">{photo.title || 'Untitled'}</p>
                      {photo.photoCaption?.intent && (
                        <span className="text-[9px] text-neutral-500 uppercase tracking-wider">
                          {photo.photoCaption.intent}
                        </span>
                      )}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          ) : (
            <div className="bg-neutral-900 border border-dashed border-neutral-800 rounded-lg p-12 text-center">
              <p className="text-neutral-600 text-sm">No photos in archive yet</p>
              <a
                href={getStudioUrl('photo')}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-neutral-500 hover:text-white transition-colors mt-2 inline-block"
              >
                Add photos in Studio &rarr;
              </a>
            </div>
          )}
        </section>
      </div>

      {/* Quick Actions */}
      <section className="mt-12 pt-8 border-t border-neutral-800">
        <h2 className="text-xs uppercase tracking-widest text-neutral-500 mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/dashboard/profiles/new"
            className="px-4 py-2 bg-white text-black text-sm font-medium rounded hover:bg-neutral-200 transition-colors"
          >
            + New Admin Profile
          </Link>
          <Link
            href="/dashboard/galleries/new"
            className="px-4 py-2 border border-neutral-700 text-neutral-300 text-sm rounded hover:bg-neutral-800 transition-colors"
          >
            + New Gallery
          </Link>
          <a
            href={getStudioUrl('photo')}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 border border-neutral-700 text-neutral-300 text-sm rounded hover:bg-neutral-800 transition-colors"
          >
            + Upload Photos
          </a>
          <a
            href={getStudioUrl('article')}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 border border-neutral-700 text-neutral-300 text-sm rounded hover:bg-neutral-800 transition-colors"
          >
            + Write Article
          </a>
        </div>
      </section>
    </div>
  );
}
