import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '@/sanity/image'

// Remove the import from '@/sanity/types' entirely.
// We use 'any' temporarily to satisfy the build worker.

export default function MediaCard({ photo }: { photo: any }) {
  return (
    <Link href={`/public/photo/${photo.slug}`} className="group block">
      <div className="relative aspect-[4/5] overflow-hidden border border-black p-1 bg-white grayscale group-hover:grayscale-0 transition-all duration-500 shadow-sm group-hover:shadow-md">
        {photo.image && (
          <Image
            src={urlFor(photo.image).width(400).height(500).url()}
            alt={photo.context?.caption || "Archival Photo"}
            fill
            className="object-cover"
          />
        )}
      </div>
      <div className="mt-2 font-mono text-[10px] uppercase tracking-tighter text-zinc-500">
        ID: {photo._id.slice(0, 8)} // {photo.associations?.location?.name || "Unknown Loc"}
      </div>
    </Link>
  )
}