// frontend/app/page.tsx
import { client } from '@/sanity/client'
import { ADMIN_QUERY } from '@/sanity/queries' // Changed from adminQuery
import TabloidFrame from '@/components/TabloidFrame'

export default async function Home() {
  // Update the fetch call as well
  const admin = await client.fetch(ADMIN_QUERY) 

  return (
    <div className="bg-black min-h-screen p-8">
      <div className="max-w-3xl mx-auto">
        <header className="mb-12 text-center">
          <h1 className="text-6xl font-black text-[#F2F2F2] tracking-tighter uppercase italic">
            STEN<span className="text-[#FF3E00]">x</span>STUDIO
          </h1>
          <p className="text-[#F2F2F2] font-mono text-sm opacity-60">
            System Status: {admin?.systemRole || 'Operational'}
          </p>
        </header>

        <TabloidFrame title="The Internal Manifesto" label="Admin Record">
          <p className="text-xl font-bold leading-none mb-4">
            {admin?.bio || 'Manifesto pending initialization...'}
          </p>
          <p className="font-mono text-xs text-slate-500 italic">
            Executing Archival Analysis as: {admin?.userHandle || 'Unknown Admin'}
          </p>
        </TabloidFrame>
      </div>
    </div>
  )
}