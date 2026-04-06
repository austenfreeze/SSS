'use client'

import Link from 'next/link'

interface Gallery {
  _id: string
  title: string
  slug: string
  description?: string
  visibility?: string
  coverPhoto?: {
    image?: {
      asset?: {
        url: string
        metadata?: {
          lqip?: string
        }
      }
    }
  }
  photosCount?: number
  photos?: Array<{
    _id: string
    image?: {
      asset?: {
        url: string
      }
    }
  }>
  _createdAt?: string
}

export function GalleryCard({ gallery }: { gallery: Gallery }) {
  const coverUrl = gallery.coverPhoto?.image?.asset?.url || gallery.photos?.[0]?.image?.asset?.url
  const photoCount = gallery.photosCount || gallery.photos?.length || 0
  
  const visibilityColors: Record<string, string> = {
    public: 'border-green-500/50 text-green-400',
    private: 'border-red-500/50 text-red-400',
    unlisted: 'border-yellow-500/50 text-yellow-400',
  }

  return (
    <Link
      href={`/dashboard/galleries/${gallery._id}`}
      className="group block border border-zinc-800 bg-zinc-950 hover:border-zinc-700 transition-all overflow-hidden"
    >
      {/* Cover Image */}
      <div className="aspect-video bg-zinc-900 overflow-hidden relative">
        {coverUrl ? (
          <img
            src={coverUrl}
            alt={gallery.title}
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-zinc-800">
              <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
        )}
        
        {/* Photo Count Badge */}
        <div className="absolute bottom-2 right-2 bg-black/80 px-2 py-1 text-[9px] uppercase tracking-wider">
          {photoCount} photos
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-bold tracking-tight truncate">
            {gallery.title}
          </h3>
          {gallery.visibility && (
            <span className={`text-[8px] px-1.5 py-0.5 border rounded uppercase tracking-widest ${visibilityColors[gallery.visibility] || 'border-zinc-500 text-zinc-400'}`}>
              {gallery.visibility}
            </span>
          )}
        </div>

        {gallery.description && (
          <p className="text-[10px] text-zinc-600 line-clamp-2 mb-3">
            {gallery.description}
          </p>
        )}

        {/* Preview thumbnails */}
        {gallery.photos && gallery.photos.length > 1 && (
          <div className="flex gap-1 mb-3">
            {gallery.photos.slice(0, 4).map((photo, i) => (
              <div key={photo._id || i} className="w-8 h-8 bg-zinc-900 overflow-hidden">
                {photo.image?.asset?.url && (
                  <img
                    src={photo.image.asset.url}
                    alt=""
                    className="w-full h-full object-cover opacity-60"
                  />
                )}
              </div>
            ))}
            {photoCount > 4 && (
              <div className="w-8 h-8 bg-zinc-900 flex items-center justify-center text-[8px] text-zinc-600">
                +{photoCount - 4}
              </div>
            )}
          </div>
        )}

        <div className="pt-3 border-t border-zinc-900 flex items-center justify-between">
          <span className="text-[8px] text-zinc-700 uppercase tracking-wider">
            {gallery._createdAt ? new Date(gallery._createdAt).toLocaleDateString() : ''}
          </span>
          <span className="text-[10px] text-zinc-500 group-hover:text-white transition-colors uppercase tracking-widest">
            Manage
          </span>
        </div>
      </div>
    </Link>
  )
}

export function GalleryCardSkeleton() {
  return (
    <div className="border border-zinc-800 bg-zinc-950 overflow-hidden animate-pulse">
      <div className="aspect-video bg-zinc-900" />
      <div className="p-4 space-y-3">
        <div className="h-4 bg-zinc-900 w-2/3" />
        <div className="h-3 bg-zinc-900 w-full" />
        <div className="flex gap-1">
          {[1,2,3,4].map(i => <div key={i} className="w-8 h-8 bg-zinc-900" />)}
        </div>
      </div>
    </div>
  )
}
