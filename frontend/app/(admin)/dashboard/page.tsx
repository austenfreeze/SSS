import { client } from "../../../src/sanity/client";

export default async function AdminDashboard() {
  // Fetching real data with our new narrative field
  const photos = await client.fetch(`
    *[_type == "photo"] | order(_createdAt desc) [0...6] {
      _id,
      title,
      photoCaption {
        narrative,
        intent
      },
      "imageUrl": image.asset->url
    }
  `);

  return (
    <div className="p-8 lg:p-12 max-w-6xl">
      <header className="mb-16">
        <p className="text-zinc-600 text-[10px] uppercase tracking-[0.4em] mb-2">
          System Update: {new Date().toLocaleDateString()}
        </p>
        <h2 className="text-4xl font-light tracking-tighter uppercase italic">
          Adaptive Archival Analysis
        </h2>
      </header>

      <div className="grid grid-cols-1 gap-16">
        {photos.length > 0 ? (
          photos.map((photo: any) => (
            <div key={photo._id} className="group grid grid-cols-1 md:grid-cols-3 gap-8 border-b border-zinc-900 pb-16">
              {/* Media Preview */}
              <div className="aspect-square bg-zinc-900 border border-zinc-800 overflow-hidden relative">
                {photo.imageUrl ? (
                   <img 
                    src={photo.imageUrl} 
                    alt={photo.title} 
                    className="object-cover w-full h-full grayscale hover:grayscale-0 transition-all duration-500" 
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-zinc-800 text-[10px] uppercase">No Media</div>
                )}
              </div>

              {/* Data & Narrative */}
              <div className="md:col-span-2 space-y-4">
                <div className="flex items-center gap-4">
                  <h3 className="text-xl font-bold tracking-tight">{photo.title || "Untitled Entry"}</h3>
                  <span className="text-[9px] px-2 py-0.5 border border-zinc-800 text-zinc-500 uppercase tracking-widest">
                    {photo.photoCaption?.intent || "General"}
                  </span>
                </div>
                
                <p className="text-zinc-400 text-sm leading-relaxed font-sans max-w-2xl">
                  {photo.photoCaption?.narrative || "No narrative established for this archival point."}
                </p>

                <div className="pt-4">
                  <button className="text-[10px] text-white underline underline-offset-4 hover:text-zinc-400 transition-colors uppercase tracking-widest">
                    Edit Document
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="py-20 border border-dashed border-zinc-900 text-center text-zinc-600 italic">
            Archive is currently empty.
          </div>
        )}
      </div>
    </div>
  );
}