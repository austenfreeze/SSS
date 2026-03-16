// components/MediaCard.tsx
"use client";

import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from "@/src/sanity/image"
import ToggleButton from "./ToggleButton"
import { useUser } from "@clerk/nextjs";

export default function MediaCard({ photo, isAdmin = false }: { photo: any, isAdmin?: boolean }) {
  const { user } = useUser();
  
  // Hard check: Is this user an admin via Clerk metadata?
  const isActualAdmin = isAdmin && user?.publicMetadata?.role === "admin";
  
  const isPublic = photo.context?.isPublic ?? false;
  const isSensitive = photo.context?.isSensitive ?? false;
  
  const displayTitle = 
    photo.context?.narrative || 
    photo.associations?.location?.name || 
    photo.context?.intent || 
    "Archival Capture";

  const slug = photo.slug;

  const CardWrapper = ({ children }: { children: React.ReactNode }) => 
    !isActualAdmin && slug ? (
      <Link href={`/public/photo/${slug}`} className="group/card block h-full">
        {children}
      </Link>
    ) : (
      <div className="relative h-full">{children}</div>
    );

  return (
    <CardWrapper>
      <div className="relative flex flex-col h-full bg-zinc-900/50 border border-zinc-800 rounded-lg overflow-hidden transition-all duration-300 group-hover/card:border-zinc-700 group-hover/card:bg-zinc-900">
        
        {/* Admin Badges - Only visible to verified Admin */}
        {isActualAdmin && (
          <div className="absolute top-3 right-3 z-20 flex gap-1.5">
             {isSensitive && (
              <span className="bg-yellow-500/90 text-[9px] font-black px-1.5 py-0.5 rounded text-black uppercase tracking-tighter">
                Sensitive
              </span>
            )}
            <span className={`px-1.5 py-0.5 text-[9px] font-black rounded uppercase tracking-tighter ${!isPublic ? 'bg-red-500 text-white' : 'bg-green-500 text-black'}`}>
              {isPublic ? 'Public' : 'Private'}
            </span>
          </div>
        )}
        
        {/* Image Display */}
        <div className="relative aspect-square overflow-hidden bg-zinc-950">
          {photo.image ? (
            <Image 
              src={urlFor(photo.image).width(800).auto('format').url()} 
              alt={displayTitle}
              fill
              className={`object-cover transition-transform duration-700 ${!isActualAdmin ? 'group-hover/card:scale-105' : ''} ${isSensitive && isActualAdmin ? 'blur-2xl opacity-40 scale-110' : ''}`}
              unoptimized
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-zinc-800 font-mono text-xs">NO_IMAGE_DATA</div>
          )}
        </div>

        <div className="p-4 flex flex-col flex-grow">
          <div className="flex justify-between items-baseline mb-2">
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
              {photo.context?.intent || 'Archive'}
            </span>
            {photo.associations?.capturedDate && (
              <span className="text-[10px] font-mono text-zinc-600">
                {new Date(photo.associations.capturedDate).getFullYear()}
              </span>
            )}
          </div>

          <h3 className="text-sm font-semibold text-zinc-200 line-clamp-1 mb-3">
            {displayTitle}
          </h3>
          
          {/* Internal Toggle for Admin View - Only visible to verified Admin */}
          {isActualAdmin && (
            <div className="mt-auto pt-2 border-t border-zinc-800/50">
              <ToggleButton id={photo._id} initialState={isPublic} />
            </div>
          )}

          {!isActualAdmin && photo.associations?.people && (
            <div className="mt-auto flex flex-wrap gap-1.5 pt-2 border-t border-zinc-800/50">
              {photo.associations.people.slice(0, 3).map((person: any) => (
                <span key={person.name} className="text-[9px] text-zinc-400 bg-zinc-800/80 px-2 py-0.5 rounded-sm">
                  {person.name}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </CardWrapper>
  )
}