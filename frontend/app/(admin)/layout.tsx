// app/(admin)/layout.tsx
import Link from "next/link";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-black text-white">
      <aside className="w-64 border-r border-zinc-800 p-6 flex flex-col gap-8">
        <div>
          <h2 className="text-xs font-mono uppercase tracking-widest text-zinc-500 mb-4">Sten Engine</h2>
          <nav className="flex flex-col gap-2">
            <Link href="/dashboard" className="text-sm hover:text-white text-zinc-400">Dashboard</Link>
            <Link href="/studio" className="text-sm hover:text-white text-zinc-400">Studio</Link>
          </nav>
        </div>
        <div className="mt-auto">
          <Link href="/" className="text-xs text-zinc-600 hover:text-zinc-400">← Back to Site</Link>
        </div>
      </aside>

      <main className="flex-1 p-10 bg-zinc-950">
        {children}
      </main>
    </div>
  );
}