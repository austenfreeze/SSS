import { client } from "@/src/sanity/client";
import { PUBLIC_PHOTOS_QUERY } from "@/src/sanity/queries";
import MediaCard from "@/components/MediaCard";

export default async function PublicArchive() {
  const photos = await client.fetch(PUBLIC_PHOTOS_QUERY);

  // Sorting logic remains the same for organizational strength
  const groupedByYear = photos.reduce((acc: any, photo: any) => {
    const year = photo.associations?.dateConfig?.yearOnly || 
                 (photo.associations?.dateConfig?.date ? new Date(photo.associations.dateConfig.date).getFullYear() : "----");
    if (!acc[year]) acc[year] = [];
    acc[year].push(photo);
    return acc;
  }, {});

  const years = Object.keys(groupedByYear).sort((a, b) => b.localeCompare(a));

  return (
    <div className="max-w-7xl mx-auto p-6 md:p-12">
      <header className="mb-20">
        <h1 className="text-4xl font-black tracking-tighter italic selection:bg-white selection:text-black">
          THE ARCHIVE
        </h1>
        <p className="text-zinc-600 font-mono uppercase tracking-[0.3em] text-[10px] mt-2">
          Adaptive Archival Analysis // v3.0
        </p>
      </header>

      {years.map(year => (
        <section key={year} className="mb-24">
          <div className="flex items-center gap-6 mb-10">
            <h2 className="text-xs font-mono text-zinc-500 uppercase tracking-[0.4em] whitespace-nowrap">{year}</h2>
            <div className="h-[1px] w-full bg-zinc-900" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {groupedByYear[year].map((photo: any) => (
              <MediaCard key={photo._id} photo={photo} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}