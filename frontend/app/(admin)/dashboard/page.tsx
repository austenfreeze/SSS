// app/(admin)/dashboard/page.tsx
import { client } from "@/src/sanity/client";
import { ADMIN_ALL_PHOTOS_QUERY } from "@/src/sanity/queries";
import MediaCard from "@/components/MediaCard";
import Link from "next/link";

export default async function AdminDashboard() {
  const allAssets = await client.fetch(ADMIN_ALL_PHOTOS_QUERY, {}, { next: { revalidate: 0 } });
  
  const totalAssets = allAssets.length;
  const privateAssets = allAssets.filter((a: any) => !a.context?.isPublic).length;
  const publicAssets = totalAssets - privateAssets;

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-10">
      <header className="flex flex-col md:flex-row justify-between items-end gap-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full md:w-auto flex-grow">
          <div className="bg-zinc-900 p-4 rounded-xl border border-zinc-800">
            <p className="text-[10px] font-mono text-zinc-500 uppercase">Total Assets</p>
            <p className="text-2xl font-bold">{totalAssets}</p>
          </div>
          <div className="bg-zinc-900 p-4 rounded-xl border border-zinc-800 text-red-500">
            <p className="text-[10px] font-mono text-zinc-500 uppercase">Private</p>
            <p className="text-2xl font-bold">{privateAssets}</p>
          </div>
          <div className="bg-zinc-900 p-4 rounded-xl border border-zinc-800 text-green-500">
            <p className="text-[10px] font-mono text-zinc-500 uppercase">Public</p>
            <p className="text-2xl font-bold">{publicAssets}</p>
          </div>
        </div>

        <div className="flex gap-3">
          <Link 
            href="/studio" 
            target="_blank"
            className="px-6 py-3 bg-white text-black text-xs font-black uppercase rounded-lg hover:bg-zinc-200 transition-all"
          >
            Open Studio
          </Link>
        </div>
      </header>

      <section>
        <div className="flex justify-between items-center mb-8 border-b border-zinc-800 pb-4">
          <h2 className="text-2xl font-black italic tracking-tighter uppercase">Recent Uploads</h2>
          <span className="text-[10px] font-mono text-zinc-600 uppercase">Engine v3.0 // Active Stream</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {allAssets.map((photo: any) => (
            <MediaCard key={photo._id} photo={photo} isAdmin={true} />
          ))}
        </div>
      </section>
    </div>
  );
}