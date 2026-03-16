// app/public/page.tsx
import { client } from "@/src/sanity/client";
import { PUBLIC_PHOTOS_QUERY } from "@/src/sanity/queries";
import MediaCard from "@/components/MediaCard";

export default async function PublicArchive() {
  // We fetch the refined query that handles back-references to galleries
  const photos = await client.fetch(PUBLIC_PHOTOS_QUERY);

  // Safety filter: Ensure sensitive content never touches the public DOM
  const filteredPhotos = photos.filter((photo: any) => photo.context?.isSensitive !== true);

  return (
    <div className="max-w-7xl mx-auto p-8">
      <header className="mb-12">
        <h1 className="text-4xl font-bold tracking-tighter">THE ARCHIVE</h1>
        <p className="text-zinc-500 italic">Curated creative assets and personal captures.</p>
      </header>

      {filteredPhotos.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredPhotos.map((photo: any) => (
            <MediaCard key={photo._id} photo={photo} isAdmin={false} />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center border border-dashed border-zinc-800 rounded-lg">
          <p className="text-zinc-500 font-mono text-sm uppercase tracking-widest">
            No public assets found in the vault.
          </p>
        </div>
      )}
    </div>
  );
}