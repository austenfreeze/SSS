import { UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { 
  SiSpotify, 
  SiFacebook, 
  SiInstagram, 
  SiYoutube, 
  SiTiktok 
} from "react-icons/si";
import { SiX } from "react-icons/si";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  const navSections = [
    {
      title: "Overview",
      items: [
        { label: "Dashboard", href: "/dashboard" },
        { label: "Admin Profiles", href: "/dashboard/profiles" },
      ],
    },
    {
      title: "Social Platforms",
      items: [
        { label: "All Platforms", href: "/dashboard/social" },
        { label: "Instagram", href: "/dashboard/social/instagram", icon: SiInstagram },
        { label: "YouTube", href: "/dashboard/social/youtube", icon: SiYoutube },
        { label: "Twitter/X", href: "/dashboard/social/twitter", icon: SiX },
        { label: "TikTok", href: "/dashboard/social/tiktok", icon: SiTiktok },
        { label: "Spotify", href: "/dashboard/social/spotify", icon: SiSpotify },
        { label: "Facebook", href: "/dashboard/social/facebook", icon: SiFacebook },
      ],
    },
    {
      title: "Media",
      items: [
        { label: "Galleries", href: "/dashboard/galleries" },
        { label: "Photos", href: "/dashboard/photos" },
      ],
    },
    {
      title: "System",
      items: [
        { label: "Studio", href: process.env.NEXT_PUBLIC_SANITY_STUDIO_URL || "/studio", external: true },
        { label: "Settings", href: "/dashboard/settings" },
      ],
    },
  ];

  return (
    <div className="flex min-h-screen bg-black text-white font-mono">
      {/* Sidebar Navigation */}
      <aside className="w-64 border-r border-zinc-800 flex flex-col sticky top-0 h-screen bg-black overflow-y-auto">
        <div className="p-6 border-b border-zinc-800 flex items-center gap-3">
          <div className="h-2 w-2 bg-white animate-pulse" />
          <h1 className="text-xs tracking-[0.2em] uppercase font-bold">Sten Console</h1>
        </div>

        <nav className="flex-1 p-4 space-y-6 mt-2">
          {navSections.map((section) => (
            <div key={section.title}>
              <p className="text-[9px] uppercase tracking-[0.3em] text-zinc-600 mb-3 px-2">
                {section.title}
              </p>
              <div className="space-y-1">
                {section.items.map((item) => {
                  const IconComponent = 'icon' in item ? item.icon : null;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      target={'external' in item && item.external ? "_blank" : undefined}
                      className="flex items-center gap-2 px-3 py-2 text-[10px] uppercase tracking-[0.15em] text-zinc-500 hover:text-white hover:bg-zinc-900 transition-all border border-transparent hover:border-zinc-800 rounded"
                    >
                      {IconComponent && <IconComponent className="w-3 h-3" />}
                      {item.label}
                      {'external' in item && item.external && (
                        <span className="ml-auto text-[8px] text-zinc-700">ext</span>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        <div className="p-4 border-t border-zinc-800 bg-zinc-950/30">
          <div className="flex items-center gap-3">
            <UserButton 
              appearance={{ 
                elements: { 
                  avatarBox: "h-8 w-8 border border-zinc-700 hover:border-white transition-colors" 
                } 
              }} 
            />
            <div className="flex-1 min-w-0">
              <p className="text-[8px] text-zinc-600 uppercase tracking-tighter">Identity Verified</p>
              <p className="text-[10px] text-zinc-400 truncate">
                {user.username || user.firstName || 'Admin'}
              </p>
            </div>
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
