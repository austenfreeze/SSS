import Image from 'next/image'
import { urlFor } from "@/src/sanity/image"

export default function PhotoView({ photo }: { photo: any }) {
  const { image, context, associations } = photo;
  const metadata = image?.asset?.metadata;
  
  const vibrant = metadata?.palette?.vibrant?.background || '#111';

  // Fix date display logic
  const dateStr = associations?.dateConfig?.precision === 'exact' && associations.dateConfig.date
    ? new Date(associations.dateConfig.date.replace(/-/g, '/')).toLocaleDateString('en-US', {
        month: 'long', day: 'numeric', year: 'numeric'
      })
    : associations?.dateConfig?.yearOnly || 'Archival Record';

  return (
    <div className="min-h-screen text-zinc-300 p-6 lg:flex gap-16 bg-black">
      {/* Media Column */}
      <div className="lg:w-3/5">
        <div 
          className="relative aspect-square md:aspect-video rounded-lg overflow-hidden border border-zinc-900 shadow-2xl"
          style={{ boxShadow: `0 0 80px ${vibrant}10` }}
        >
          <Image 
            src={urlFor(image).url()} 
            alt={context?.caption || "Archive"} 
            fill 
            className="object-contain"
            priority
          />
        </div>
      </div>

      {/* Metadata Column */}
      <div className="lg:w-2/5 flex flex-col pt-8 lg:pt-0">
        <header className="mb-10">
          <p className="text-zinc-500 font-mono text-[10px] uppercase tracking-[0.4em] mb-2">
            {associations?.location?.name || 'Unknown Location'} — {dateStr}
          </p>
          <h1 className="text-3xl font-bold text-white tracking-tighter mb-4 italic">
            {context?.caption || 'Untitled Capture'}
          </h1>
          <p className="text-zinc-400 leading-relaxed text-sm max-w-md">
            {context?.narrative}
          </p>
        </header>

        {/* Associations Section */}
        <div className="space-y-8 border-t border-zinc-900 pt-8">
          {associations?.people?.length > 0 && (
            <div>
              <h4 className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest mb-3">Associations</h4>
              <div className="flex flex-wrap gap-2">
                {associations.people.map((person: any) => (
                  <span key={person.slug} className="px-3 py-1 bg-zinc-900 text-zinc-400 text-[10px] border border-zinc-800">
                    {person.name}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          {/* Hardware Metadata */}
          <div>
            <h4 className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest mb-3">System EXIF</h4>
            <div className="grid grid-cols-2 gap-4 text-[10px] font-mono">
              <div className="text-zinc-500">CAMERA: <span className="text-zinc-300">{metadata?.exif?.Model || 'N/A'}</span></div>
              <div className="text-zinc-500">ISO: <span className="text-zinc-300">{metadata?.exif?.ISO || 'N/A'}</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}