import Link from "next/link";
import { type SanityDocument } from "next-sanity";
import { client } from "@/sanity/client";

const LOGS_QUERY = `*[_type == "logType"] | order(timestamp desc)[0...5]{
  _id, changeTitle, timestamp, category
}`;

export default async function IndexPage() {
  const logs = await client.fetch<SanityDocument[]>(LOGS_QUERY, {}, { next: { revalidate: 30 } });

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8 max-w-5xl mx-auto">
      <header className="text-center mb-16">
        <h1 className="text-6xl font-black tracking-tighter mb-4 italic">STENxSTUDIO</h1>
        <p className="text-zinc-500 font-mono uppercase tracking-[0.2em]">The Sten of Reality // v3.0</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
        {/* PUBLIC SIDE - Points to app/public/page.tsx */}
        <Link href="/public" className="group p-8 border border-zinc-800 rounded-2xl hover:border-zinc-400 transition-all bg-zinc-900/50">
          <h2 className="text-2xl font-bold mb-2 group-hover:translate-x-2 transition-transform">Public Archive →</h2>
          <p className="text-zinc-400">Curated creative assets, photography, and editorial collections.</p>
        </Link>

        {/* ADMIN SIDE - Points to app/(admin)/dashboard/page.tsx */}
        <Link href="/dashboard" className="group p-8 border border-zinc-800 rounded-2xl hover:border-zinc-400 transition-all bg-zinc-900/50">
          <h2 className="text-2xl font-bold mb-2 group-hover:translate-x-2 transition-transform">Access Dashboard →</h2>
          <p className="text-zinc-400">Manage raw assets, link entities, and configure the engine.</p>
        </Link>
      </div>

      <section className="mt-20 w-full max-w-3xl">
        <div className="flex justify-between items-end mb-6 border-b border-zinc-800 pb-2">
          <h3 className="text-sm font-mono uppercase tracking-widest text-zinc-500">Recent System Logs</h3>
          {/* Adjusted to point to wherever you host your logs */}
          <Link href="/dashboard" className="text-xs hover:underline">View All</Link>
        </div>
        <ul className="space-y-3">
          {logs.map((log) => (
            <li key={log._id} className="flex justify-between text-sm items-center p-3 rounded-lg hover:bg-zinc-900/80 transition-colors">
              <div className="flex gap-4 items-center">
                <span className="text-[10px] font-mono bg-zinc-800 px-2 py-0.5 rounded text-zinc-400 uppercase">
                  {log.category}
                </span>
                <span className="font-medium text-zinc-300">{log.changeTitle}</span>
              </div>
              <span className="text-zinc-600 text-[10px] font-mono">
                {new Date(log.timestamp).toLocaleDateString()}
              </span>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}