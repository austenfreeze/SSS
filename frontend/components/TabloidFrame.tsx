export default function TabloidFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative p-8 bg-[#F2F2F2] text-black shadow-xl border-4 border-black">
      {/* This mimics your 'tabloid-frame' asset using CSS masks or the actual image */}
      <div className="absolute inset-0 pointer-events-none border-[20px] border-transparent"
           style={{ borderImage: "url('/tabloid-frame.png') 30 stretch" }} />
      {children}
    </div>
  )
}