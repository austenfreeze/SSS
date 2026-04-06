import { client } from '@/src/sanity/client'
import { GALLERIES_QUERY } from '@/src/sanity/adminQueries'
import { GalleryCard } from '@/components/gallery/GalleryCard'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function GalleriesPage() {
  const galleries = await client.fetch(GALLERIES_QUERY)

  const totalPhotos = galleries.reduce((sum: number, g: any) => sum + (g.photosCount || 0), 0)
  const publicGalleries = galleries.filter((g: any) => g.visibility === 'public').length
  const privateGalleries = galleries.filter((g: any) => g.visibility === 'private').length

  const studioUrl = process.env.NEXT_PUBLIC_SANITY_STUDIO_URL || '/studio'

  return (
    <div className="p-8 lg:p-12 max-w-6xl">
      {/* Header */}
      <header className="mb-12">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-zinc-600 text-[10px] uppercase tracking-[0.4em] mb-2">
              Media Management
            </p>
            <h1 className="text-4xl font-light tracking-tighter uppercase italic">
              Galleries
            </h1>
          </div>
          <a
            href={`${studioUrl}/structure/gallery`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-white text-black text-[10px] uppercase tracking-widest hover:bg-zinc-200 transition-colors"
          >
            Create Gallery
          </a>
        </div>
        <p className="text-zinc-500 text-sm max-w-xl">
          Organize and manage photo collections with drag-and-drop reordering. 
          Create curated galleries for different purposes and audiences.
        </p>
      </header>

      {/* Stats Bar */}
      <div className="grid grid-cols-4 gap-4 mb-12 border border-zinc-800 p-6">
        <div>
          <p className="text-2xl font-bold">{galleries.length}</p>
          <p className="text-[9px] text-zinc-600 uppercase tracking-wider">Total Galleries</p>
        </div>
        <div>
          <p className="text-2xl font-bold">{totalPhotos}</p>
          <p className="text-[9px] text-zinc-600 uppercase tracking-wider">Total Photos</p>
        </div>
        <div>
          <p className="text-2xl font-bold">{publicGalleries}</p>
          <p className="text-[9px] text-zinc-600 uppercase tracking-wider">Public</p>
        </div>
        <div>
          <p className="text-2xl font-bold">{privateGalleries}</p>
          <p className="text-[9px] text-zinc-600 uppercase tracking-wider">Private</p>
        </div>
      </div>

      {/* Galleries Grid */}
      {galleries.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {galleries.map((gallery: any) => (
            <GalleryCard key={gallery._id} gallery={gallery} />
          ))}
        </div>
      ) : (
        <div className="py-20 border border-dashed border-zinc-900 text-center">
          <svg className="w-12 h-12 text-zinc-800 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <p className="text-zinc-600 italic mb-4">No galleries found.</p>
          <a
            href={`${studioUrl}/structure/gallery`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] text-white underline underline-offset-4 uppercase tracking-widest"
          >
            Create First Gallery
          </a>
        </div>
      )}

      {/* Quick Actions */}
      <section className="mt-12 border border-zinc-800 p-6">
        <h2 className="text-[10px] uppercase tracking-[0.3em] text-zinc-500 mb-4">
          Quick Actions
        </h2>
        <div className="flex flex-wrap gap-3">
          <a
            href={`${studioUrl}/structure/photo`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 border border-zinc-800 text-[10px] uppercase tracking-widest hover:border-white hover:text-white transition-colors text-zinc-500"
          >
            Manage Photos
          </a>
          <Link
            href="/dashboard/photos"
            className="px-4 py-2 border border-zinc-800 text-[10px] uppercase tracking-widest hover:border-white hover:text-white transition-colors text-zinc-500"
          >
            Photo Browser
          </Link>
        </div>
      </section>
    </div>
  )
}
