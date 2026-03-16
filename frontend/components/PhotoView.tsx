// components/PhotoView.tsx
import Image from 'next/image'
import { urlFor } from "@/src/sanity/image"

export default function PhotoView({ photo }: { photo: any }) {
  const { metadata, context, associations, people } = photo;
  
  // Extract the dominant vibrant color or fallback to a dark grey
  const vibrant = metadata?.palette?.vibrant?.background || '#09090b';
  const darkMuted = metadata?.palette?.darkMuted?.background || '#000000';

  const displayDate = associations?.capturedDate 
    ? new Date(associations.capturedDate).toLocaleDateString('en-US', {
        month: 'long', day: 'numeric', year: 'numeric'
      })
    : 'Archive Entry';

  return (
    // Dynamic background using a radial gradient from the photo's palette
    <div 
      className="min-h-screen text-zinc-300 p-4 md:p-8 lg:flex gap-12 transition-colors duration-1000"
      style={{ 
        background: `radial-gradient(circle at top right, ${vibrant}22, ${darkMuted} 100%)`,
        backgroundColor: '#000000'
      }}
    >
      {/* Primary Image Display */}
      <div className="lg:w-2/3 flex flex-col items-center justify-center bg-black/40 backdrop-blur-3xl rounded-xl overflow-hidden border border-white/5 shadow-2xl">
        <div className="relative w-full aspect-[4/3] md:aspect-video">
          <Image
            src={urlFor(photo.image).auto('format').url()}
            alt={context?.narrative || "Archive View"}
            fill
            className="object-contain p-4 md:p-8"
            unoptimized 
            priority
          />
        </div>
      </div>

      {/* The Technical Sidebar */}
      <div className="lg:w-1/3 mt-8 lg:mt-0 flex flex-col gap-8">
        <section>
          <div className="flex items-center gap-3 mb-2">
            <span 
               className="w-2 h-2 rounded-full animate-pulse" 
               style={{ backgroundColor: vibrant }} 
            />
            <p className="text-xs font-mono text-zinc-500 uppercase tracking-widest">
              {context?.intent || 'Asset'} — {displayDate}
            </p>
          </div>
          <h1 className="text-3xl font-bold text-white mb-4 tracking-tight">
            {context?.narrative || 'Untitled Capture'}
          </h1>
          <p className="text-zinc-400 leading-relaxed font-light">
            {context?.caption}
          </p>
        </section>

        <hr className="border-white/10" />

        {/* Technical EXIF Grid */}
        <section className="grid grid-cols-2 gap-3 font-mono text-[10px]">
          <div className="bg-white/5 border border-white/10 p-3 rounded-md">
            <p className="text-zinc-500 mb-1">OPTICS</p>
            <p className="text-zinc-200">
               {metadata?.exif?.FNumber ? `ƒ/${metadata.exif.FNumber}` : '—'} • {metadata?.exif?.ExposureTime ? `${metadata.exif.ExposureTime}s` : '—'}
            </p>
          </div>
          <div className="bg-white/5 border border-white/10 p-3 rounded-md">
            <p className="text-zinc-500 mb-1">ISO</p>
            <p className="text-zinc-200">{metadata?.exif?.ISO || '—'}</p>
          </div>
          <div className="bg-white/5 border border-white/10 p-3 rounded-md">
            <p className="text-zinc-500 mb-1">HARDWARE</p>
            <p className="text-zinc-200 truncate">{metadata?.exif?.Model || 'Unknown'}</p>
          </div>
          <div className="bg-white/5 border border-white/10 p-3 rounded-md">
            <p className="text-zinc-500 mb-1">COLOR DNA</p>
            <div className="flex gap-1 mt-1">
              {Object.values(metadata?.palette || {}).slice(0, 4).map((col: any, i) => (
                <div key={i} className="w-3 h-3 rounded-sm" style={{ backgroundColor: col.background }} />
              ))}
            </div>
          </div>
        </section>

        {/* Tagged People */}
        {associations?.people && (
          <section>
            <h4 className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-3">Associations</h4>
            <div className="flex flex-wrap gap-2">
              {associations.people.map((person: any) => (
                <div key={person.slug} className="px-3 py-1 bg-white/5 border border-white/10 rounded text-xs hover:bg-white/10 transition-colors">
                  {person.name}
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}