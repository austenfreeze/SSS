import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '@/sanity/image'
import { Photo } from '@/sanity/types'

export default function MediaCard({ photo }: { photo: Photo }) {
  return (
    <Link href={`/public/photo/${photo.slug}`} className="group block border border-black bg-white p-2 hover:shadow-[8px_8px_0px_0px_rgba(255,62,0,1)] transition-all">
      <div className="relative aspect-square overflow-hidden border border-slate-200 grayscale group-hover:grayscale-0 transition-all">
        <Image
          src={urlFor(photo.image).width(600).url()}
          alt={photo.context?.caption || 'Archival Image'}
          fill
          className="object-cover"
          placeholder="blur"
          blurDataURL={photo.image.asset.metadata.lqip}
        />
      </div>
      <div className="mt-2 flex justify-between items-start font-mono text-[10px] uppercase">
        <span className="truncate max-w-[70%]">
          {photo.associations.location?.name || 'Unknown Loc'}
        </span>
        <span className="text-[#FF3E00]">
          {photo.associations.dateConfig?.title || 'UNDATED'}
        </span>
      </div>
    </Link>
  )
}