// app/public/layout.tsx

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="public-interface min-h-screen bg-black">
      {/* This is the "Living Room" wrapper. 
          You can add a public header here later.
      */}
      <nav className="p-6 border-b border-zinc-900 flex justify-between items-center">
        <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest">
          Public Archive
        </span>
        <a href="/" className="text-xs text-zinc-500 hover:text-white transition-colors">
          Return Home
        </a>
      </nav>

      <main>{children}</main>
    </div>
  );
}