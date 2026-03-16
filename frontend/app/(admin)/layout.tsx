import { UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  const navItems = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Archive", href: "/archive" },
    { label: "Studio", href: "/studio" },
    { label: "Settings", href: "/settings" },
  ];

  return (
    <div className="flex min-h-screen bg-black text-white font-mono">
      {/* Sidebar Navigation */}
      <aside className="w-64 border-r border-zinc-800 flex flex-col sticky top-0 h-screen bg-black">
        <div className="p-6 border-b border-zinc-800 flex items-center gap-3">
          <div className="h-2 w-2 bg-white animate-pulse" />
          <h1 className="text-xs tracking-[0.2em] uppercase font-bold">Sten Console</h1>
        </div>

        <nav className="flex-1 p-4 space-y-2 mt-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block px-4 py-2 text-[10px] uppercase tracking-[0.2em] text-zinc-500 hover:text-white hover:bg-zinc-900 transition-all border border-transparent hover:border-zinc-800"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="p-6 border-t border-zinc-800 flex items-center justify-between bg-zinc-950/30">
          {/* REMOVED afterSignOutUrl to fix Vercel Build Error */}
          <UserButton 
            appearance={{ 
              elements: { 
                avatarBox: "h-8 w-8 border border-zinc-700 hover:border-white transition-colors" 
              } 
            }} 
          />
          <div className="text-right">
            <p className="text-[8px] text-zinc-600 uppercase tracking-tighter">Identity Verified</p>
            <p className="text-[9px] text-zinc-400 truncate max-w-[100px]">
              {user.username || user.firstName || 'Admin'}
            </p>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}