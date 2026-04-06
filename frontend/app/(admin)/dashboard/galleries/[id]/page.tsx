'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { DraggablePhotoGrid } from '@/components/gallery/DraggablePhotoGrid'
import { StatusToggle } from '@/components/admin/StatusToggle'

interface GalleryPhoto {
  _key: string
  _type: string
  asset?: {
    _ref: string
    url?: string
  }
  alt?: string
  caption?: string
}

interface Gallery {
  _id: string
  title: string
  slug?: { current: string }
  description?: string
  coverImage?: {
    asset?: { url: string }
  }
  photos?: GalleryPhoto[]
  isPublished?: boolean
  isFeatured?: boolean
  category?: string
  tags?: string[]
  _createdAt: string
  _updatedAt: string
}

export default function GalleryEditorPage() {
  const params = useParams()
  const router = useRouter()
  const galleryId = params.id as string
  const isNew = galleryId === 'new'

  const [gallery, setGallery] = useState<Gallery | null>(null)
  const [loading, setLoading] = useState(!isNew)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Form state
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [slug, setSlug] = useState('')
  const [category, setCategory] = useState('')
  const [tags, setTags] = useState('')
  const [isPublished, setIsPublished] = useState(false)
  const [isFeatured, setIsFeatured] = useState(false)
  const [photos, setPhotos] = useState<GalleryPhoto[]>([])

  useEffect(() => {
    if (!isNew) {
      fetchGallery()
    }
  }, [galleryId, isNew])

  async function fetchGallery() {
    try {
      const res = await fetch(`/api/admin/galleries/${galleryId}`)
      if (!res.ok) throw new Error('Failed to fetch gallery')
      const data = await res.json()
      setGallery(data)
      // Populate form
      setTitle(data.title || '')
      setDescription(data.description || '')
      setSlug(data.slug?.current || '')
      setCategory(data.category || '')
      setTags(data.tags?.join(', ') || '')
      setIsPublished(data.isPublished || false)
      setIsFeatured(data.isFeatured || false)
      setPhotos(data.photos || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load gallery')
    } finally {
      setLoading(false)
    }
  }

  async function handleSave() {
    setSaving(true)
    setError(null)

    const payload = {
      title,
      description,
      slug: slug || title.toLowerCase().replace(/\s+/g, '-'),
      category,
      tags: tags.split(',').map(t => t.trim()).filter(Boolean),
      isPublished,
      isFeatured,
    }

    try {
      const url = isNew ? '/api/admin/galleries' : `/api/admin/galleries/${galleryId}`
      const method = isNew ? 'POST' : 'PATCH'

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Failed to save gallery')
      }

      const data = await res.json()
      
      if (isNew) {
        router.push(`/dashboard/galleries/${data._id}`)
      } else {
        setGallery(data)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save')
    } finally {
      setSaving(false)
    }
  }

  async function handlePhotoReorder(newOrder: GalleryPhoto[]) {
    setPhotos(newOrder)
    
    if (!isNew && galleryId) {
      try {
        await fetch(`/api/admin/galleries/${galleryId}/reorder`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            photoKeys: newOrder.map(p => p._key),
          }),
        })
      } catch (err) {
        console.error('Failed to save photo order:', err)
      }
    }
  }

  async function handleDelete() {
    if (!confirm('Are you sure you want to delete this gallery? This cannot be undone.')) {
      return
    }

    try {
      const res = await fetch(`/api/admin/galleries/${galleryId}`, {
        method: 'DELETE',
      })

      if (!res.ok) throw new Error('Failed to delete gallery')
      router.push('/dashboard/galleries')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete')
    }
  }

  if (loading) {
    return (
      <div className="p-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-neutral-800 rounded w-1/3"></div>
          <div className="h-64 bg-neutral-800 rounded"></div>
        </div>
      </div>
    )
  }

  const studioUrl = !isNew 
    ? `${process.env.NEXT_PUBLIC_SANITY_STUDIO_URL || '/studio'}/structure/media;gallery;${galleryId}`
    : null

  return (
    <div className="p-6 md:p-8 max-w-6xl">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <Link 
            href="/dashboard/galleries" 
            className="text-sm text-neutral-400 hover:text-white mb-2 inline-block"
          >
            &larr; Back to Galleries
          </Link>
          <h1 className="text-2xl md:text-3xl font-bold text-white">
            {isNew ? 'Create Gallery' : `Edit: ${gallery?.title || 'Gallery'}`}
          </h1>
        </div>
        
        <div className="flex items-center gap-3">
          {studioUrl && (
            <a
              href={studioUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 border border-neutral-700 text-neutral-300 rounded hover:bg-neutral-800 transition-colors text-sm"
            >
              Edit in Studio
            </a>
          )}
          {!isNew && (
            <button
              onClick={handleDelete}
              className="px-4 py-2 border border-red-900 text-red-400 rounded hover:bg-red-900/30 transition-colors text-sm"
            >
              Delete
            </button>
          )}
          <button
            onClick={handleSave}
            disabled={saving || !title}
            className="px-6 py-2 bg-white text-black rounded font-medium hover:bg-neutral-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {saving ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-900/30 border border-red-800 rounded text-red-300">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Info */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-white mb-4">Basic Information</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-1">
                  Title *
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-2 bg-neutral-800 border border-neutral-700 rounded text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-white/20"
                  placeholder="Gallery title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-1">
                  Slug
                </label>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  className="w-full px-4 py-2 bg-neutral-800 border border-neutral-700 rounded text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-white/20"
                  placeholder="gallery-url-slug"
                />
                <p className="text-xs text-neutral-500 mt-1">
                  Auto-generated from title if left empty
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-1">
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-2 bg-neutral-800 border border-neutral-700 rounded text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-white/20 resize-none"
                  placeholder="Gallery description..."
                />
              </div>
            </div>
          </div>

          {/* Photos Section */}
          {!isNew && (
            <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-white">
                  Photos ({photos.length})
                </h2>
                <a
                  href={studioUrl || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-neutral-400 hover:text-white"
                >
                  Add photos in Studio &rarr;
                </a>
              </div>
              
              {photos.length > 0 ? (
                <DraggablePhotoGrid
                  photos={photos}
                  onReorder={handlePhotoReorder}
                />
              ) : (
                <div className="text-center py-12 text-neutral-500">
                  <p>No photos yet</p>
                  <p className="text-sm mt-1">
                    Add photos via Sanity Studio
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Status */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-white mb-4">Status</h2>
            
            <div className="space-y-4">
              <StatusToggle
                label="Published"
                description="Make this gallery visible on the site"
                checked={isPublished}
                onChange={setIsPublished}
              />
              
              <StatusToggle
                label="Featured"
                description="Show in featured galleries section"
                checked={isFeatured}
                onChange={setIsFeatured}
              />
            </div>
          </div>

          {/* Organization */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-white mb-4">Organization</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-1">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-2 bg-neutral-800 border border-neutral-700 rounded text-white focus:outline-none focus:ring-2 focus:ring-white/20"
                >
                  <option value="">Select category</option>
                  <option value="portraits">Portraits</option>
                  <option value="events">Events</option>
                  <option value="editorial">Editorial</option>
                  <option value="personal">Personal</option>
                  <option value="archive">Archive</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-1">
                  Tags
                </label>
                <input
                  type="text"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  className="w-full px-4 py-2 bg-neutral-800 border border-neutral-700 rounded text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-white/20"
                  placeholder="tag1, tag2, tag3"
                />
                <p className="text-xs text-neutral-500 mt-1">
                  Separate with commas
                </p>
              </div>
            </div>
          </div>

          {/* Metadata */}
          {!isNew && gallery && (
            <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6">
              <h2 className="text-lg font-semibold text-white mb-4">Metadata</h2>
              
              <dl className="space-y-2 text-sm">
                <div>
                  <dt className="text-neutral-500">Document ID</dt>
                  <dd className="text-neutral-300 font-mono text-xs break-all">
                    {gallery._id}
                  </dd>
                </div>
                <div>
                  <dt className="text-neutral-500">Created</dt>
                  <dd className="text-neutral-300">
                    {new Date(gallery._createdAt).toLocaleDateString()}
                  </dd>
                </div>
                <div>
                  <dt className="text-neutral-500">Last Updated</dt>
                  <dd className="text-neutral-300">
                    {new Date(gallery._updatedAt).toLocaleDateString()}
                  </dd>
                </div>
              </dl>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
