// components/MediaCard.tsx
"use client";

import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from "@/src/sanity/image"
import ToggleButton from "./ToggleButton"
import { useUser } from "@clerk/nextjs";

export default function MediaCard({ photo, isAdmin = false }: { photo: any, isAdmin?: boolean }) {
  const { user } = useUser();
  const isActualAdmin = isAdmin && user?.publicMetadata?.role === "admin";
  
  const isPublic = photo.context?.isPublic ?? false;
  const isSensitive = photo.context?.isSensitive ?? false;
  
  // Handling the refined dateConfig
  const dateConfig = photo.associations?.dateConfig;
  const displayDate = dateConfig?.precision === 'exact' && dateConfig?.date
    ? new Date(dateConfig.date.replace(/-/g, '/')).getFullYear()
    : dateConfig?.yearOnly || '0000';

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
      <div className="relative flex flex-col h-full bg-zinc-900/40 border border-zinc-800/50 hover:border-zinc-500/50 transition-all duration-500 group/card">
        
        {/* Admin Badges */}
        {isActualAdmin && (
          <div className="absolute top-2 left-2 z-20 flex gap-1">
            <span className={`px-1.5 py-0.5 text-[8px] font-black uppercase tracking-tighter ${!isPublic ? 'bg-red-600 text-white' : 'bg-emerald-500 text-black'}`}>
              {isPublic ? 'Live' : 'Hidden'}
            </span>
          </div>
        )}
        
        {/* Media Block */}
        <div className="relative aspect-[4/5] overflow-hidden bg-black">
          {photo.image ? (
            <Image 
              src={urlFor(photo.image).width(600).auto('format').url()} 
              alt="Archival Asset"
              fill
              className={`object-cover transition-transform duration-700 ${!isActualAdmin ? 'group-hover/card:scale-105' : ''} ${isSensitive && isActualAdmin ? 'blur-xl opacity-50' : ''}`}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-zinc-800 font-mono text-[9px]">NULL_ASSET</div>
          )}
        </div>

        {/* System Metadata Panel */}
        <div className="p-4 flex flex-col flex-grow">
          {/* Header Row: Location & Date */}
          <div className="flex justify-between items-baseline mb-4 border-b border-zinc-800 pb-2">
            <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest truncate max-w-[70%]">
              {photo.associations?.location?.name || 'Unspecified Loc'}
            </span>
            <span className="text-[10px] font-mono text-zinc-600">
              {displayDate}
            </span>
          </div>

          {/* Core Entities: People */}
          <div className="flex flex-wrap gap-1.5 mb-4">
           {photo.associations?.people?.length > 0 ? (
  photo.associations.people.map((person: any, index: number) => (
    <span 
      // Using a composite key to guarantee uniqueness even if the ID is duplicated
      key={`${person._id || 'p'}-${index}`} 
      className="text-[9px] font-medium text-zinc-300 bg-white/5 border border-white/10 px-2 py-0.5 rounded-sm"
    >
      {person.name}
    </span>
  ))
) : (
  <span className="text-[9px] font-mono text-zinc-700 uppercase italic">No entities referenced</span>
)}
          </div>

          {/* Footer Metadata: Tags & Intent */}
          <div className="mt-auto pt-3 border-t border-zinc-800/50 flex justify-between items-center">
            <div className="flex gap-2">
              {photo.associations?.tags?.slice(0, 2).map((tag: any, index: number) => (
                <span 
                  key={tag._id || `tag-${index}`} 
                  className="text-[9px] font-mono text-zinc-500 tracking-tighter"
                >
                  #{tag.title?.toLowerCase() || 'untitled'}
                </span>
              ))}
            </div>
            <span className="text-[9px] font-mono text-zinc-600 italic uppercase">
              {photo.context?.intent || 'Archive'}
            </span>
          </div>
          
          {/* Admin Management Toggle */}
          {isActualAdmin && (
            <div className="mt-4 pt-3 border-t border-zinc-800">
              <ToggleButton id={photo._id} initialState={isPublic} />
            </div>
          )}
        </div>
      </div>
    </CardWrapper>
  );
}