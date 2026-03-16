import Link from "next/link";
import { type SanityDocument } from "next-sanity";
import { client } from "@/sanity/client";

const LOGS_QUERY = `*[_type == "logType"] | order(timestamp desc)[0...5]{
  _id, changeTitle, timestamp, category
}`;

export default async function IndexPage() {
  const logs = await client.fetch<SanityDocument[]>(LOGS_QUERY, {}, { next: { revalidate: 30 } });

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-8 max-w-5xl mx-auto">
      <header className="text-center mb-20">
        <h1 className="text-7xl font-black tracking-tighter mb-4 italic selection:bg-white selection:text-black">
          STENxSTUDIO
        </h1>
        <p className="text-zinc-600 font-mono uppercase tracking-[0.3em] text-[10px]">
          Performance Architecture // v3.0
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
        {/* PUBLIC SIDE */}
        <Link href="/public" className="group p-10 border border-zinc-900 hover:border-zinc-700 transition-all duration-500 bg-black">
          <h2 className="text-xs font-mono uppercase tracking-[0.2em] text-zinc-500 mb-4">External</h2>
          <h3 className="text-3xl font-bold mb-2 group-hover:italic transition-all">Public Archive</h3>
          <p className="text-zinc-600 text-sm leading-relaxed">Photography, curated assets, and editorial narrative.</p>
        </Link>

        {/* ADMIN SIDE */}
        <Link href="/dashboard" className="group p-10 border border-zinc-900 hover:border-zinc-700 transition-all duration-500 bg-black">
          <h2 className="text-xs font-mono uppercase tracking-[0.2em] text-zinc-500 mb-4">Internal</h2>
          <h3 className="text-3xl font-bold mb-2 group-hover:italic transition-all">Dashboard</h3>
          <p className="text-zinc-600 text-sm leading-relaxed">System configuration and raw archival ingestions.</p>
        </Link>
      </div>

      <section className="mt-24 w-full max-w-2xl border-t border-zinc-900 pt-12">
        <h3 className="text-[10px] font-mono uppercase tracking-[0.4em] text-zinc-800 mb-10 text-center">Recent System Logs</h3>
        <ul className="space-y-1">
          {logs.map((log) => (
            <li key={log._id} className="group flex justify-between text-sm py-4 border-b border-zinc-950 hover:border-zinc-900 transition-all">
              <div className="flex gap-6 items-center">
                <span className="text-[9px] font-mono text-zinc-800 group-hover:text-zinc-500 uppercase tracking-tighter w-16">
                  {log.category}
                </span>
                <span className="font-medium text-zinc-500 group-hover:text-white">
                  {log.changeTitle}
                </span>
              </div>
              <span className="text-zinc-800 text-[9px] font-mono">
                {new Date(log.timestamp).toLocaleDateString()}
              </span>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}